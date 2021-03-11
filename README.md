## 1 задача:

```mysql
SELECT 
    u.id as ID,
    concat(u.first_name, ' ', u.last_name) as Name,
    it.author as Author,
    it.Books as Books
FROM
    users u
        INNER JOIN
    (SELECT 
        user_id,
            COUNT(user_id) AS count,
            author,
            GROUP_CONCAT(b.name separator ', ') AS Books
    FROM
        user_books ub
    LEFT JOIN books b ON ub.book_id = b.id
    GROUP BY author , user_id) AS it ON u.id = it.user_id
		INNER JOIN 
	(SELECT 
		user_id,
		COUNT(user_id) AS count
	FROM
		user_books ub
			LEFT JOIN
		books b ON ub.book_id = b.id
	GROUP BY user_id) as sit on u.id = sit.user_id
WHERE
    it.count = 2 AND sit.count = 2 AND u.age BETWEEN 7 AND 17
```

Дамп бд лежит в корне проекта с названием test.sql

## 2 задача:
Чтобы развернуть проект нужно выполнить след. действия:
- Склонировать репозиторий
- cd meleton
- docker-compose up -d
- docker exec -it h-php bash -c "./init.sh"

P.S.
* Ось значения не имеет, нужен docker 19+ и docker-compose 1.2.5+
* Последняя команда будет относительно долго выполнятся, т.к. там подтягиваются всякие зависимости фреймворка
* Когда нужно будет потушить контейнеры, в корне проекта docker-compose down соответственно

После выполнения вышеописаных команд проект развернется по адресу 
http://localhost:10113

Документация к методам апи описана в **swagger**, он доступен по адресу 
http://localhost:10113/api/documentation

Для того, чтобы получить токен доступа следует сделать POST запрос на 
http://localhost:10113/api/v1/auth

(также описан в документации)

креды:

**admin@admin.ru**

**12345**


