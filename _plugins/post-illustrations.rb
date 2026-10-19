# frozen_string_literal: true

# Place illustrations uploaded through Sveltia CMS's "삽화" field.
#
# The post body is edited as plain text (Sveltia's markdown editor escaped
# `~` as `\~` and broke the HTML logs), so there is no image button in the
# body anymore. Instead the editor uploads pictures into the `illust` list in
# the front matter:
#
#   illust:
#     - image: /assets/img/posts/rain.webp
#       alt: 창가의 세연
#       width: 80
#
# and writes a short marker where each one should go: `[삽화1]`, `[삽화2]`, ...
# (1-based, in list order). The marker works anywhere in the body, including
# inside the generator's HTML blocks.
#
# This runs on :post_convert like markdown-image-rescue.rb, so Chirpy's
# `refactor-content.html` still applies its lightbox, lazy-loading and shimmer
# treatment to the tags we emit. Unknown numbers are left as written so a typo
# stays visible on the page.

module PostIllustrations
  # Regions whose contents must never be rewritten.
  PROTECTED = %r!<(pre|code|script|style|textarea)\b[^>]*>.*?</\1\s*>!mi

  MARKER = /\[\s*삽화\s*(\d+)\s*\]/

  def self.escape_attr(value)
    value.to_s
         .gsub(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|\#\d+|\#[xX]\h+);)/, "&amp;")
         .gsub("<", "&lt;")
         .gsub(">", "&gt;")
         .gsub('"', "&quot;")
  end

  # An entry is either a path string or { image, alt, width }.
  def self.normalize(entry)
    item = entry.is_a?(Hash) ? entry : { "image" => entry }
    src = item["image"].to_s.strip
    return nil if src.empty?

    src = "/#{src}" if src.start_with?("assets/")
    width = item["width"].to_s.strip.delete_suffix("%").to_i
    { src: src, alt: item["alt"].to_s.strip, width: width.between?(1, 99) ? width : nil }
  end

  # A <span> displayed as a block, so the tag stays valid inside a <p>.
  def self.to_html(item)
    style = item[:width] ? %( style="width: #{item[:width]}%; height: auto;") : ""
    %(<span class="post-illust" style="display: block; text-align: center; margin: 1.2em 0;">) +
      %(<img src="#{escape_attr(item[:src])}" alt="#{escape_attr(item[:alt])}"#{style}></span>)
  end

  def self.convert(chunk, items, doc)
    chunk.gsub(MARKER) do
      n = Regexp.last_match(1).to_i
      item = n >= 1 ? items[n - 1] : nil
      if item
        to_html(item)
      else
        Jekyll.logger.warn "Illustrations:", "#{doc.relative_path}: [삽화#{n}] has no picture in the 삽화 list"
        Regexp.last_match(0)
      end
    end
  end

  def self.place(content, items, doc)
    result = +""
    cursor = 0

    content.scan(PROTECTED) do
      match = Regexp.last_match
      result << convert(content[cursor...match.begin(0)], items, doc)
      result << match[0]
      cursor = match.end(0)
    end

    result << convert(content[cursor..] || "", items, doc)
    result
  end
end

Jekyll::Hooks.register :documents, :post_convert do |doc|
  next unless doc.output_ext == ".html"

  list = doc.data["illust"]
  next unless list.is_a?(Array) && !list.empty?
  next unless doc.content.match?(PostIllustrations::MARKER)

  items = list.map { |entry| PostIllustrations.normalize(entry) }
  doc.content = PostIllustrations.place(doc.content, items, doc)
end
