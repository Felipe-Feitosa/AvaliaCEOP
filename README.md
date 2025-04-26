# Dashboard de Avaliações - CEOP

Dashboard para visualização em tempo real das avaliações de pacientes do CEOP, conectado a uma planilha do Google Sheets.

## Pré-requisitos

1. Python 3.8 ou superior
2. Bibliotecas listadas em `requirements.txt`

## Configuração

1. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```

2. Para acesso ao Google Sheets:
   - Para acesso a planilha pública: Apenas configure a URL da planilha em `.streamlit/secrets.toml`
   - Para acesso a planilha privada: Siga as instruções em https://docs.streamlit.io/develop/tutorials/databases/private-gsheet para configurar as credenciais do serviço

## Execução

Para iniciar o dashboard, execute:
```
streamlit run DASHBOARD/ceop_dashboard.py
```

## Estrutura dos Dados

O dashboard espera que a planilha do Google Sheets tenha as seguintes colunas:
1. Carimbo de data/hora (timestamp)
2. Avaliação de atendimento (nota de 0 a 10)
3. Recomendação (nota de 0 a 10)
4. Comentário (opcional) 