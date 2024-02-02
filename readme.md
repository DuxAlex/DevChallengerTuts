<html>
<body>
<div class="w-full text-token-text-primary" data-testid="conversation-turn-12" style="--avatar-color: #19c37d;"><div class="px-4 py-2 justify-center text-base md:gap-6 m-auto"><div class="flex flex-1 text-base mx-auto gap-3 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group final-completion"><div class="flex-shrink-0 flex flex-col relative items-end"><div><div class="pt-0.5"><div class="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full"><div class="h-6 w-6"><div class="gizmo-shadow-stroke overflow-hidden rounded-full"></div></div></div></div></div></div><div class="relative flex w-full flex-col lg:w-[calc(100%-115px)] agent-turn"><div class="flex-col gap-1 md:gap-3"><div class="flex flex-grow flex-col max-w-full"><div data-message-author-role="assistant" data-message-id="4c59425b-bd71-4637-a9eb-fcc1110c8e07" class="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto"><div class="markdown prose w-full break-words dark:prose-invert dark"><p></p><h1>Projeto de Integração com Google Sheets</h1><p>Este projeto Node.js é uma aplicação para processar dados de estudantes de um Google Sheets, calcular suas situações com base em médias de notas e presenças, e atualizar a planilha com essas informações.</p><h2>Pré-requisitos</h2><p>Antes de iniciar, certifique-se de ter o Node.js e o npm instalados em seu ambiente. Você também precisará de credenciais de acesso à API do Google Sheets, as quais podem ser obtidas no <a target="_new">Console do Google Cloud</a>.</p><h2>Configuração</h2><ol><li>Clone este repositório ou baixe os arquivos para o seu computador.</li><li>Instale as dependências do projeto executando <code>npm install</code> no diretório do projeto.</li><li>Coloque o arquivo de credenciais do Google Cloud (formato JSON) no diretório do projeto.</li><li>Crie um arquivo <code>.env</code> no diretório raiz do projeto e adicione a seguinte linha: <code>GOOGLE_APPLICATION_CREDENTIALS=&lt;caminho_para_sua_chave_de_credenciais&gt;.json</code>.</li></ol><h2>Executando a Aplicação</h2><p>Para executar a aplicação, utilize o comando <code>node sheets_integration.js</code> no terminal, estando no diretório do projeto. A aplicação irá acessar a planilha do Google Sheets, processar os dados dos estudantes e atualizar a planilha com as situações e notas calculadas.<p> Além do arquivo principal existem outros com funçoes diferentes para ajudar entender o funcionamento da api sendo eles o addData.js (Para adicionar dados no fim da planilha) e o get_sheet.js (Para visualizar todos os dados da planilha) </p></p> </p><h2>Estrutura do Projeto</h2><p>O projeto consiste nos seguintes arquivos principais:</p><ul><li><code>sheets_integration.js</code>: O arquivo principal que contém a lógica de integração com a API do Google Sheets, processamento dos dados dos estudantes e atualização da planilha.</li></ul><h2>Contribuições</h2><p>Contribuições para o projeto são bem-vindas. Por favor, certifique-se de atualizar os testes conforme apropriado.</p><h2>Licença</h2><p>Este projeto está sob a licença <a target="_new">MIT</a></div></div></div></div></div></div></div></div>
</body>
</html>
