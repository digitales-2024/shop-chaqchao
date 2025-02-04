# Deploy con docker a VPS

### En la configuracion del proyecto en github

Agregar secretos:

- STAGE_SERVER_HOST
- STAGE_SSH_PRIVATE_KEY
- STAGE_SSH_USERNAME

- NEXT_PUBLIC_BACKEND_URL_GOOGLE_LOGIN
- NEXT_PUBLIC_API_SUNAT_TOKEN
- NEXT_PUBLIC_PAYPAL_CLIENT_ID
- NEXT_PUBLIC_IZIPAY_PAYMENT_USERNAME
- NEXT_PUBLIC_IZIPAY_PAYMENT_PASSWORD
- NEXT_PUBLIC_IZIPAY_PAYMENT_ENDPOINT
- NEXT_PUBLIC_IZIPAY_PAYMENT_PUBLIC_KEY

Agregar variable:

- SERVICE_NAME : nombre del servicio en el docker-compose
- SERVICE_HOME : carpeta en el VPS donde esta el docker-compose

- NEXT_PUBLIC_BACKEND_URL : url final del backend. ejm: "https://api-chaqchao.acide.dev/api/v1"
- NEXT_PUBLIC_SOCKET_URL : url final de los websockets del backend. ejm: "https://api-chaqchao.acide.dev/ws"


