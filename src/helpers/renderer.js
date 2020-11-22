import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  const helmet = Helmet.renderStatic();
  return `<!DOCTYPE html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <meta property='og:url' content='https://pikachu-mongker.herokuapp.com/' />
                <meta property='og:title' content='Lê Văn Mong' />
                <meta property='og:image' content='https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/50563438_689410878126991_7859610905514868736_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=NZ4v4n7wdgAAX95dW_7&_nc_ht=scontent.fhan2-5.fna&oh=7d90566e115e98b3aca3a799d83332fb&oe=5FD9F03B' />
                <meta property='og:description' content='Đây là sản phẩm demo SSR của với thư viện ReactJS ' />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
                      /</g,
                      '\\u003c'
                    )}
                </script>
                <script src="/bundle.js"></script>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            </body>
    </html>`;
};
