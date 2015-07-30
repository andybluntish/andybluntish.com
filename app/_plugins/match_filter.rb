# Test a string against a Regular Expression

module Jekyll
  module RegExpFilter
    def match(input, pattern)
      !!(Regexp.new(pattern.to_s) =~ input.to_s)
    end
  end
end

Liquid::Template.register_filter(Jekyll::RegExpFilter)
