it-community
============
Сайт IT-сообщества.
Будет располагаться по адресу www.it61.info

### Подготовка

Для начала необходимо [установить node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager). Затем в директории проекта нужно выполнить:

```
npm install
```

### Файлы

```
/app - клиент
/server - файлы сервера
bower.json - зависимости bower (клиент)
package.json - зависимости npm (клиент + сервер)
app.js - сервер
Gruntfile.js

```

### Клиент

Angular-приложение создано с помощью [Yo](http://yeoman.io/).
Файлы сервера - app.js

#### Роутинг

Вместо стандартного [ngRoute](http://docs.angularjs.org/api/ngRoute) используется [ui-router](https://github.com/angular-ui/ui-router).

### Сервер
Предоставляет REST API.


