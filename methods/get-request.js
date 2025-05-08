module.exports = (req, res) => {

    const baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    // console.log('baseUrl::'+baseUrl)
    const id = req.url.split('/')[3];
    console.log('hello get')
    // console.log('id::'+id)
    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    //console.log('regexv4::'+regexV4.test(id))

    if(req.url === '/api/movies') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end()
    }else if(!regexV4.test(id)) {
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(
            JSON.stringify({
                title: 'Validation Failed',
                message: "UUID is not valid"
            })
        );
    }else if(baseUrl === '/api/movies/' && regexV4.test(id)) {
        res.setHeader("Content-Type", "application/json");
        const filterdMovie = req.movies.filter((movie) => {
            return movie.id === id;
        });
        if(filterdMovie.length > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify(filterdMovie));
            res.end()
        }else{
            res.statusCode = 404;
            res.write(
                JSON.stringify({ title: "Not Found", message: "Movie not found" })
            );
            res.end();
        }
    }
    else{
        res.writeHead(404, {'Content-Type': "application/json"})
        res.end(JSON.stringify({title: "Not Found", message: 'Route not found'}))
    }
}; 