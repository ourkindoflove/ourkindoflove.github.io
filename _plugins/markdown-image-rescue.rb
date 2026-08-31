# frozen_string_literal: true

# Rescue Markdown image syntax that kramdown refused to parse.
#
# Most posts here are pasted out of an external "log generator" that wraps the
# whole body in block-level <div>s. kramdown treats everything inside a block
# level HTML element as raw HTML, so image syntax that Sveltia CMS inserts in
# there survives into the output verbatim:
#
#   ![image1](/assets/img/posts/xxx.webp "image1")
#
# `parse_block_html: true` fixes that globally but mangles the generator HTML,
# so instead we rewrite whatever image syntax is *left over* after conversion
# into a plain <img> tag. Images that kramdown already handled are gone by this
# point, so nothing that works today is touched.
#
# This runs on :post_convert -- after Markdown conversion, before the layout --
# so Chirpy's `refactor-content.html` still applies its lightbox, lazy-loading
# and shimmer treatment to the tags we emit.

module MarkdownImageRescue
  # Regions whose contents must never be rewritten.
  PROTECTED = %r!<(pre|code|script|style|textarea)\b[^>]*>.*?</\1\s*>!mi

  IMAGE = /
    !\[(?<alt>[^\]\n]*)\]                                       # ![alt]
    \(
      \s*(?<src>[^\s()]+)                                       # (src
      (?:\s+(?<quote>"|'|&quot;|&\#39;)(?<title>.*?)\k<quote>)?  #  optional "title"
      \s*
    \)
    (?<ial>\{:[^}\n]*\})?                                       # optional kramdown IAL
  /x

  # Sveltia writes the image widget's "link" field as a Markdown link wrapping
  # the image: [![alt](src "title")](href). Handle that as one unit so the
  # outer link does not survive as literal text.
  LINKED_IMAGE = /
    \[\s*(?<img>!\[[^\]\n]*\]\([^)\n]*\)(?:\{:[^}\n]*\})?)\s*\]
    \(
      \s*(?<href>[^\s()]+)
      (?:\s+(?<quote>"|'|&quot;|&\#39;)(?<title>.*?)\k<quote>)?
      \s*
    \)
  /x

  # Escape for use in an attribute value. `&` is only escaped when it does not
  # already start an entity, so text coming out of raw-HTML regions is not
  # double-escaped.
  def self.escape_attr(value)
    value.to_s
         .gsub(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|\#\d+|\#[xX]\h+);)/, "&amp;")
         .gsub("<", "&lt;")
         .gsub(">", "&gt;")
         .gsub('"', "&quot;")
  end

  # Translate a kramdown IAL -- `{: .normal }`, `{: width="700" h="400" }` --
  # into attributes. Chirpy's refactor step maps `w=`/`h=` to width/height.
  def self.attrs_from_ial(ial)
    return "" if ial.nil? || ial.empty?

    body = ial.sub(/\A\{:\s*/, "").sub(/\s*\}\z/, "")
    classes = []
    attrs = +""

    body.scan(/(?<key>[\w-]+)=(?<q>"|')(?<val>.*?)\k<q>|\.(?<cls>[\w-]+)|\#(?<id>[\w-]+)/) do
      match = Regexp.last_match
      if match[:key]
        attrs << %( #{match[:key]}="#{escape_attr(match[:val])}")
      elsif match[:cls]
        classes << match[:cls]
      elsif match[:id]
        attrs << %( id="#{match[:id]}")
      end
    end

    attrs << %( class="#{classes.join(" ")}") unless classes.empty?
    attrs
  end

  def self.to_img_tag(match)
    tag = +%(<img src="#{escape_attr(match[:src])}" alt="#{escape_attr(match[:alt])}")
    tag << %( title="#{escape_attr(match[:title])}") if match[:title]
    tag << attrs_from_ial(match[:ial])
    tag << ">"
  end

  def self.to_linked_img_tag(match)
    anchor = +%(<a href="#{escape_attr(match[:href])}")
    anchor << %( title="#{escape_attr(match[:title])}") if match[:title]
    inner = match[:img].sub(IMAGE) { to_img_tag(Regexp.last_match) }
    "#{anchor}>#{inner}</a>"
  end

  def self.convert(chunk)
    chunk
      .gsub(LINKED_IMAGE) { to_linked_img_tag(Regexp.last_match) }
      .gsub(IMAGE) { to_img_tag(Regexp.last_match) }
  end

  # Walk the document, converting only the parts outside protected regions.
  def self.rescue_images(content)
    return content unless content.include?("![")

    result = +""
    cursor = 0

    content.scan(PROTECTED) do
      match = Regexp.last_match
      result << convert(content[cursor...match.begin(0)])
      result << match[0]
      cursor = match.end(0)
    end

    result << convert(content[cursor..] || "")
    result
  end
end

Jekyll::Hooks.register %i[documents pages], :post_convert do |doc|
  next unless doc.output_ext == ".html"

  doc.content = MarkdownImageRescue.rescue_images(doc.content)
end
