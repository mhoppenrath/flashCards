var closeConstructor = function(text, cloze){
  this.fullText = text;
  this.cloze = cloze;
  this.partial = text;
  this.partial.replace(cloze, "...");
  this.kind = "cloze";
}



module.exports = closeConstructor;
