$.ajaxPrefilter(options => {
    options.url = 'http://api-breakingnews-web.iteima.net/' + options.url
})