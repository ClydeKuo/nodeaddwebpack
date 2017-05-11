var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348'

function filterChapter(data) {
    var $ = cheerio.load(data)
    var chapters = $('.chapter')
    var courseData = []
    chapters.each(function (index, data) {
        var chapter = $(data)
        chapterTitle = chapter.find("strong .icon-chapter")[0].next.data.trim()
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        }
        chapterVideos = chapter.find(".J-media-item")

        chapterVideos.each(function (item,data) {
            var video=$(data)
            chapterData.videos.push({
                title:video.text().trim().split(/\s\s/)[0]
            })
        })
        courseData.push(chapterData)
    })
    return courseData
    // console.log(chapters[0].next.data.trim())
}
function printCourseData(data){
    data.forEach(function(item){
        console.log(item.chapterTitle)
        item.videos.forEach(function(video){
            console.log(video.title)
        })
    })
}
http.get(url, function (res) {
    var html = ''
    res.on('data', function (data) {
        html += data
    })
    res.on('end', function () {
      var courseData=  filterChapter(html)
      printCourseData(courseData)
    })
}).on('error', function () {
    console.log('error')
})