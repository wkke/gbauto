/*
 * @Author: admin
 * @Date:   2018-09-18 16:14:25
 * @Last Modified by:   admin
 * @Last Modified time: 2018-09-18 16:14:39
 */
/*
 * @Author: admin
 * @Date:   2018-09-18 15:35:27
 * @Last Modified by:   admin
 * @Last Modified time: 2018-09-18 15:36:01
 */
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    mime = require('mime')



//函数Response，将HTML、css、js等文件响应给客户端
var Response = function(res, filePath) {
    //读取文件，读取完成后给客户端响应
    fs.readFile(filePath, function(err, data) {
        if (err) { //如果失败，就返回错误文件
            if (filePath != "errot.html") //如果失败的不是错误文件，才返回错误文件
                Response(res, error);
        } else {
            res.writeHead(200, { //响应客户端，将文件内容发回去
                'Content-type': mime.getType(filePath)
            });
            res.end(data);
        }
    });
};
//404错误响应文件
var error404 = function(res) {
    Response(res, error);
};


function handler(req, res) {

    //判断URL，提供不同的路由
    if (req.url == '/') { //主页
        Response(res, "./index.html");
    } else { //访问其它静态文件，如/stylesheets/index.css
        Response(res, "./" + req.url);
    }


}

io.sockets.on('connection', function(socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function(data) {
        console.log(data);
    });
});

app.listen(8080);