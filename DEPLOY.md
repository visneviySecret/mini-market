# 🚀 Инструкция по деплою Poshagam Client

## Файлы для деплоя

- `Dockerfile` - образ для сборки Nuxt приложения
- `docker-compose.yml` - базовая конфигурация
- `docker-compose.prod.yml` - продакшн конфигурация с Traefik и SSL
- `.dockerignore` - исключения для Docker
- `deploy.sh` - скрипт автоматического деплоя

## 🔧 Подготовка VPS сервера

### 1. Установка Docker и Docker Compose

```bash
# Обновление пакетов
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Перезагрузка для применения изменений
sudo reboot
```

### 2. Клонирование репозитория

```bash
cd /opt
sudo git clone https://github.com/your-username/poshagam-client.git
cd poshagam-client
```

## 🚀 Варианты деплоя

### Вариант 1: Базовый деплой (без SSL)

```bash
# Запуск
docker-compose up -d

# Проверка логов
docker-compose logs -f

# Остановка
docker-compose down
```

Приложение будет доступно на `http://your-vps-ip:5000`

### Вариант 2: Продакшн с SSL (рекомендуется)

1. **Настройка DNS**: Направьте домен `poshagam.shop` на IP VPS сервера

2. **Редактирование конфигурации** (если нужно изменить домен):

```bash
nano docker-compose.prod.yml
```

Замените в labels:

- `poshagam.shop` - на ваш домен (если отличается)
- `your-email@example.com` - на вашу почту для Let's Encrypt

3. **Запуск**:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

Приложение будет доступно на `https://poshagam.shop`

## ⚙️ Конфигурация

### Переменные окружения в docker-compose.yml

```yaml
environment:
  - NODE_ENV=production
  - NUXT_HOST=0.0.0.0
  - NUXT_PORT=3000 # Внутренний порт контейнера
  - VITE_API_URL=https://poshagam.shop/api # URL бэкенд API
  - VITE_REFRESH_TOKEN=poshagam_refresh_token_rafaello # Токен для обновления
```

### Порты

- **Внешний порт**: `5000` - порт на хост-машине
- **Внутренний порт**: `3000` - порт внутри контейнера
- Проброс: `5000:3000`

## 🔄 Автоматический деплой

### Настройка скрипта деплоя

```bash
chmod +x deploy.sh
```

### Использование

```bash
./deploy.sh
```

Скрипт автоматически:

- Подтянет изменения из git
- Соберёт новый Docker образ
- Перезапустит контейнеры
- Очистит старые образы

## 📊 Полезные команды

### Просмотр логов

```bash
docker-compose logs -f poshagam-client
```

### Перезапуск контейнера

```bash
docker-compose restart poshagam-client
```

### Проверка статуса

```bash
docker-compose ps
```

### Вход в контейнер

```bash
docker exec -it poshagam-client sh
```

### Остановка всех контейнеров

```bash
docker-compose down
```

### Полная очистка (включая volumes)

```bash
docker-compose down -v
docker system prune -a
```

## 🛡️ Безопасность

### Настройка Firewall (UFW)

```bash
sudo ufw allow 22/tcp     # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw allow 5000/tcp   # Poshagam Client (если без Traefik)
sudo ufw enable
```

### Автоматическое обновление SSL сертификатов

Traefik автоматически обновляет SSL сертификаты Let's Encrypt каждые 60 дней.

## 📈 Мониторинг

### Просмотр использования ресурсов

```bash
docker stats poshagam-client
```

### Проверка работоспособности

```bash
# Проверка внутреннего порта
curl http://localhost:5000

# Проверка через домен (если настроен SSL)
curl https://poshagam.shop
```

### Мониторинг логов в реальном времени

```bash
docker-compose logs -f --tail=100 poshagam-client
```

## 🔧 Troubleshooting

### Контейнер не запускается

```bash
# Проверка логов
docker-compose logs poshagam-client

# Пересборка без кеша
docker-compose build --no-cache
docker-compose up -d
```

### Проблемы с портами

```bash
# Проверка занятых портов
sudo netstat -tulpn | grep :5000

# Остановка процесса на порту
sudo kill -9 $(sudo lsof -t -i:5000)
```

### SSL сертификат не выдаётся

1. Проверьте, что домен `poshagam.shop` указывает на IP вашего VPS:

   ```bash
   nslookup poshagam.shop
   ```

2. Проверьте, что порты 80 и 443 открыты:

   ```bash
   sudo ufw status
   ```

3. Проверьте логи Traefik:
   ```bash
   docker-compose logs traefik
   ```

### Ошибки с переменными окружения

Если видите ошибки типа `VITE_API_URL is not defined`:

1. Проверьте отсутствие пробелов в `docker-compose.yml`:

   ```yaml
   - VITE_API_URL=https://poshagam.shop/api # Правильно
   - VITE_API_URL = https://poshagam.shop/api # Неправильно (лишние пробелы)
   ```

2. Пересоберите контейнер:
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

## 🔄 CI/CD с GitHub Actions

Создайте `.github/workflows/deploy.yml` для автоматического деплоя:

```yaml
name: Deploy Poshagam Client to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /opt/poshagam-client
            ./deploy.sh
```

### Настройка GitHub Secrets

В настройках репозитория добавьте:

- `VPS_HOST` - IP адрес вашего VPS
- `VPS_USERNAME` - имя пользователя (обычно `root`)
- `VPS_SSH_KEY` - приватный SSH ключ

## 📝 Backup

### Создание backup

```bash
# Backup кода
docker-compose exec poshagam-client tar -czf /tmp/backup.tar.gz /app
docker cp poshagam-client:/tmp/backup.tar.gz ./backup-$(date +%Y%m%d).tar.gz

# Backup конфигурации
tar -czf config-backup-$(date +%Y%m%d).tar.gz docker-compose.yml docker-compose.prod.yml Dockerfile
```

### Восстановление из backup

```bash
# Остановка контейнера
docker-compose down

# Восстановление
tar -xzf backup-20240101.tar.gz

# Запуск
docker-compose up -d
```

## 🔍 Проверка после деплоя

### Чек-лист проверки

1. ✅ Контейнер запущен и работает:

   ```bash
   docker ps | grep poshagam-client
   ```

2. ✅ Порт 5000 слушается:

   ```bash
   netstat -tulpn | grep :5000
   ```

3. ✅ Приложение отвечает:

   ```bash
   curl http://localhost:5000
   ```

4. ✅ SSL работает (если используется prod конфигурация):

   ```bash
   curl -I https://poshagam.shop
   ```

5. ✅ API доступен:
   ```bash
   curl https://poshagam.shop/api/health
   ```

## 📊 Структура сети

```
Internet
    ↓
[Traefik] :80, :443 (SSL)
    ↓
[poshagam-client] :3000 (internal)
    ↓ :5000 (external)
Host Machine
```

## 🆘 Поддержка

При возникновении проблем проверьте:

1. **Логи контейнера**: `docker-compose logs -f poshagam-client`
2. **Доступность портов**: `sudo netstat -tulpn | grep -E ':(5000|80|443)'`
3. **DNS настройки**: `nslookup poshagam.shop`
4. **SSL сертификаты**: `docker-compose logs traefik | grep -i certificate`
5. **Переменные окружения**: `docker exec poshagam-client env | grep VITE`

## 📞 Контакты

При критических проблемах с деплоем обращайтесь к DevOps команде.
