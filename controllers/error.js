exports.get404 = (req, res) => {
    res.status(404);
    res.render('404', {
        pageTitle: "صفحه مورد نظر پیدا نشد"
    })
}