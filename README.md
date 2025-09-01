# 📌 Projeto de Localização de Pessoas

Aplicação web construída com [Next.js](https://nextjs.org), utilizada para exibir e detalhar registros de pessoas desaparecidas ou localizadas.  
Permite busca, paginação, detalhamento de registros e envio de informações pela comunidade.

---

## 🚀 Tecnologias

- **Next.js 14+** (framework React)
- **Node.js** (ambiente de execução)
- **Docker** (empacotamento e execução em contêiner)

---

## 📦 Como rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (opcional, apenas se rodar sem Docker)  
- [Docker](https://docs.docker.com/get-docker/) instalado  

---

### 2. Clonar o repositório

```bash
git clone https://github.com/matheusfellipe/redebusca.git
cd redebusca

docker build -t redebusca .


docker run -d -p 8080:3000 --name redebusca-container redebusca
