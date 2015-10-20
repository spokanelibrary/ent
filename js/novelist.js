var novelistUrl = "http://imageserver.ebscohost.com/novelistselect/ns2init.js";//The location of the NoveList js
var novelistProfile = "s8427805.main.novsel"; //This is your profile as provided by Novelist
var novelistPassword = "dGJyMOPY8UivprQA"; //This is your password as provided by Novelist
var currentNovSelectAttempt = 1;

function goNovelist(detail)
{
    
    var detailIndex="";
    if(detail!=undefined)
    {
        detailIndex = "detail"+detail;
    }
    else
    {
        detail="";
    }
    if (typeof(novSelect) == 'undefined')
    {
        var novelistScript = new Element('script', {
        type: 'text/javascript',
        id: 'EIT',
        src: ''+novelistUrl+''});
        jQuery('body').append(novelistScript);
    }
    if(document.getElementById(detailIndex+'_ISBN').hasChildNodes())
    {
        // mobile safari workaround-sg
        var novelistISBN = document.getElementById(detailIndex+'_ISBN').childNodes[0].innerHTML;
        var novTelAnchor = document.getElementById(detailIndex+'_ISBN').childNodes[0].childNodes[0].innerHTML;
        if ( typeof(novTelAnchor) != 'undefined' ) {
            novelistISBN = novTelAnchor;
        }
        jQuery('#detail_accordion'+detail).append('<h3><a href="#">Related Reading</a></h3><div id="novelistContent" data-novelist-novelistselect="'+novelistISBN+'"><div id="NoveListSelect" class="NovelistSelect"></div></div>');
        NoveListSelectEnrichment(novelistISBN);
        //NoveListSelectEnrichment(document.getElementById(detailIndex+'_ISBN').childNodes[0].innerHTML);
    }
    
}

function NoveListSelectEnrichment(isbn) {
    
    if (typeof(novSelect) == 'undefined') {
        currentNovSelectAttempt++;
        if(currentNovSelectAttempt<= 10) {
            // setTimeout function w/ params should be in a closure -sg
            setTimeout(function () {
              NoveListSelectEnrichment(isbn);
            }, 250);
            //setTimeout("NoveListSelectEnrichment("+isbn+")", 250);
        }
    }
    else {
        novSelect.loadContentForISBN(String(isbn), novelistProfile, novelistPassword);
    }
    
}
