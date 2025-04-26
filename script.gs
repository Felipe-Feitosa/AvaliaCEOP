// Configuração inicial da planilha
function initialSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  // Renomear a primeira aba se necessário
  if (sheet.getName() !== "Sheet1") {
    sheet.setName("Sheet1");
  }
  
  // Definir cabeçalhos
  sheet.getRange("A1:D1").setValues([["Timestamp", "Atendimento", "Recomendação", "Comentário"]]);
  sheet.getRange("A1:D1").setFontWeight("bold");
  sheet.setFrozenRows(1);
  
  // Ajustar largura das colunas
  sheet.setColumnWidth(1, 180); // Timestamp
  sheet.setColumnWidth(2, 120); // Atendimento
  sheet.setColumnWidth(3, 120); // Recomendação
  sheet.setColumnWidth(4, 400); // Comentário
  
  // Formatar como tabela
  var range = sheet.getDataRange();
  range.setBorder(true, true, true, true, true, true);
  
  // Mensagem de confirmação
  SpreadsheetApp.getUi().alert("Configuração inicial concluída com sucesso!");
}

// Função para processar as submissões do formulário
function doPost(e) {
  try {
    // Verificar se os dados foram recebidos
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Dados não recebidos."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Obter e analisar os dados enviados
    var data = JSON.parse(e.postData.contents);
    
    // Validar campos obrigatórios
    if (!data.atendimento || !data.recomendacao) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Campos obrigatórios não preenchidos."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Acessar a planilha ativa
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1");
    
    // Criar o registro com data e hora atual
    var timestamp = new Date();
    var atendimento = data.atendimento;
    var recomendacao = data.recomendacao;
    var comentario = data.comentario || ""; // Comentário é opcional
    
    // Adicionar o registro à planilha
    sheet.appendRow([timestamp, atendimento, recomendacao, comentario]);
    
    // Retornar resposta de sucesso
    return ContentService.createTextOutput(JSON.stringify({
      success: true
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Registrar o erro para depuração
    console.error("Erro ao processar submissão: " + error.toString());
    
    // Retornar resposta de erro
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para testar a configuração
function testSetup() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1");
    
    if (!sheet) {
      return "Erro: Aba 'Sheet1' não encontrada. Execute a função initialSetup primeiro.";
    }
    
    // Verificar se os cabeçalhos estão corretos
    var headers = sheet.getRange("A1:D1").getValues()[0];
    var expectedHeaders = ["Timestamp", "Atendimento", "Recomendação", "Comentário"];
    
    for (var i = 0; i < expectedHeaders.length; i++) {
      if (headers[i] !== expectedHeaders[i]) {
        return "Erro: Cabeçalhos não configurados corretamente. Execute a função initialSetup.";
      }
    }
    
    // Verificar permissões de URL
    var scriptProperties = PropertiesService.getScriptProperties();
    var deploymentId = scriptProperties.getProperty("deploymentId");
    
    if (!deploymentId) {
      return "Aviso: Script ainda não implantado como Web App. Implante o script seguindo as instruções do README.";
    }
    
    return "Configuração testada com sucesso! O sistema está pronto para receber avaliações.";
  } catch (error) {
    return "Erro ao testar configuração: " + error.toString();
  }
} 