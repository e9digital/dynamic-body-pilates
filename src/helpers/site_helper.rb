module SiteHelper
  def full_page_title
    [@site_name, @page_title].compact.join(@title_delimiter)
  end
end
