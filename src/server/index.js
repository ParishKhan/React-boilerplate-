import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import streamString from 'node-stream-string';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import App from "../app/App";
import config from '../../webpack.config';

const app = express();


if(process.env.NODE_ENV === 'development') {
	const compiler = webpack(config);
    
    app.use(webpackDevMiddleware(compiler, {
        serverSideRender: true
    }));
    // NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
    app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
    app.use(webpackHotServerMiddleware(compiler));
}


app.use(express.static("public"));

app.get("*", (req, res) => {
    const stream = streamString`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Universal React</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
        </head>
        <body>    
            <div id='root'>${renderToNodeStream(<App/>)}</div>
        </body>
    </html>
    `
    stream.pipe(res)
});

app.listen(process.env.PORT || 3005, () => {
  console.log("Server is listening");
});