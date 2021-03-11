if [ -e '.env' ]
then
    echo "Проект инициализирован..."
    php artisan l5-swagger:generate
else
    composer install
    cp -- .env.example .env
    php artisan key:generate
    php artisan migrate --seed -q
    php artisan l5-swagger:generate
fi
