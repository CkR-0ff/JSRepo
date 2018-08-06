class al{
    constructor(){}
    static get(src, callback){
        var txtFile = new XMLHttpRequest();
        txtFile.open("GET", src, true);
        txtFile.onreadystatechange = function() {
            if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
                if (txtFile.status === 200) {
                    allText = txtFile.responseText;
                    callback(txtFile.responseText);
                }
            }
        }
        txtFile.send(null);
    }
}