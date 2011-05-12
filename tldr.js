javascript:
/* tldr.js copyright Seth Raphael 2011 */
void (initsumm());

function initsumm () {
    initStopList();
    var paragraphs = document.getElementsByTagName('p');
    var rootContent;
    if (!rootContent) rootContent = document.getElementById('post'); /*blogs*/
    if (!rootContent) rootContent = document.getElementById('content'); /*wikipedia*/
    if (!rootContent) rootContent = document.getElementById('article'); /*NYTimes*/
    if (!rootContent) rootContent = document.getElementById('articles');
    if (!rootContent) rootContent = document.getElementById('cnnContentContainer'); /*wikipedia*/
    if (!rootContent) rootContent = document.getElementById('main'); /*wikipedia*/
    if (!rootContent) rootContent = document.getElementById('page'); /*wikipedia*/
    if (!rootContent) rootContent = document.body; /*everythingelse*/    
    paragraphs = rootContent.getElementsByTagName('p');
    thetext = '';
    var count = 0;
    for (var i = 0; i < paragraphs.length; i++) {
        newtext = parseps(paragraphs[i]);
        if (newtext.indexOf(". ") !=-1 || newtext.indexOf(".") == newtext.length){
            thetext += newtext +". ";
            count ++;
        }
    }
    d=window.getSelection()+'';
    if (d) parseit (d);
    else parseit(thetext);
    showit();
}

function parseps (n) {
    if (n.nodeType == 3) {
        if (n.data) {
            return n.data + " ";
        } else return ;
    }
    var children = n.childNodes;               
    var text ='';
    for(var i=0; i < children.length; i++) {   
        text += parseps(children[i]);     
    }
    return text;
}
var sentences;
var sorted_scores;
function parseit(text) {
    sentences = findsentences(text);
    var dictionary = new Array();
    for (i=0; i<sentences.length; i++) {
        var my_words = findwords(sentences[i]);
        for (j=0; j<my_words.length; j++) {
            if (!dictionary[my_words[j].toLowerCase()]) dictionary[my_words[j].toLowerCase()]=0;
            dictionary[my_words[j].toLowerCase()]++;
        }
    }
    var scores = new Array();
    var topsentence = 0;
    for (i=0; i<sentences.length; i++) {
        scores[i] = 0;                    
        var count = 0;
        var my_words = findwords(sentences[i]);
        var goodwords = 0;
        for (j=0; j<my_words.length; j++) {
            if (my_words[j].length >3) {
                if (!dictionary[my_words[j].toLowerCase()]) dictionary[my_words[j].toLowerCase()]=0;
                var rx = new RegExp(" " + my_words[j].toLowerCase().replace(/[^a-zA-Z 0-9]+/g,'') + " ");
                if (!rx.test(stoplist)) { 
                        scores[i] += dictionary[my_words[j].toLowerCase()];
                        goodwords++;
                    }
                count ++;
            }
        }
        scores[i]/=count;
        if (goodwords < 2) {
            scores[i] = 0;
        };
    }
    /*alert (sentences);*/
    sorted_scores = new Array();
    i = 0;
    for(i = 0; i < scores.length; i++) {
     sorted_scores[i] = [scores[i], i];
    }
    sorted_scores.sort(sortit);
}
function showit() {
    var summary;
    if (!summary) {
        summary = document.createElement('div');
        summary.style.position = "fixed";
        summary.style.fontSize = "1em";
        summary.style.top = "0px";
        summary.style.width = "100%";
        summary.style.backgroundColor = "lightblue";
        summary.style.color = "black";
        summary.style.zIndex = "9999999999";
        document.body.appendChild(summary);
    }
    summary.innerHTML = "<ol>";
    for (var i=0; i < 5; i++) {
        var thissentence = sentences[sorted_scores[i][1]];
        var thisscore = sorted_scores[i][0];
        summary.innerHTML += "<li>"  + thissentence + "</li>";
    };
    summary.innerHTML += "</ol>";
    
}

function findsentences (text) {
    
    var t = text.replace(/\b(..)\./g, " $1");
    t = t.replace(/\.(.)\./g,"$1");
    var sentences = t.split(/\./);
    return sentences;
}
function findwords (text) {
    var words = text.split(" ");
    return words;
}

function sortit (a,b) {
    var aa;
    var bb;
    if (!a[0]) {
        aa = 0;
    } else {
        aa = a[0]; 
    }
    if (!b[0]) {
        bb = 0;
    } else {
        bb = b[0]; 
    }
    return bb - aa;   
}
function initStopList() {
    stoplist=" 'll 've 10 39 a able about above abst accordance according accordingly across act actually ad added adj adopted ae af affected affecting affects after afterwards ag again against ah ai al all almost alone along already also although always am among amongst an and announce another any anybody anyhow anymore anyone anything anyway anyways anywhere ao apparently approximately aq ar are aren aren't arent arise around arpa as aside ask asking at au auth available aw away awfully az b ba back bb bd be became because become becomes becoming been before beforehand begin beginning beginnings begins behind being believe below beside besides between beyond bf bg bh bi billion biol bj bm bn bo both br brief briefly bs bt but buy bv bw by bz c ca came can can't cannot caption cause causes cc cd certain certainly cf cg ch ci ck cl click cm cn co co. com come comes contain containing contains copy could couldn couldn't couldnt cr cs cu cv cx cy cz d date de did didn didn't different dj dk dm do does doesn doesn't doing don don't done down downwards due during dz e each ec ed edu ee effect eg eh eight eighty either else elsewhere end ending enough er es especially et et-al etc even ever every everybody everyone everything everywhere ex except f far few ff fi fifth fifty find first five fix fj fk fm fo followed following follows for former formerly forth forty found four fr free from further furthermore fx g ga gave gb gd ge get gets getting gf gg gh gi give given gives giving gl gm gmt gn go goes gone got gotten gov gp gq gr gs gt gu gw gy h had happens hardly has hasn hasn't have haven haven't having he he'd he'll he's hed help hence her here here's hereafter hereby herein heres hereupon hers herself hes hi hid him himself his hither hk hm hn home homepage how howbeit however hr ht htm html http hu hundred i i'd i'll i'm i've i.e. id ie if ii il im immediate immediately importance important in inc inc. indeed index information instead int into invention inward io iq ir is isn isn't it it'll it's itd its itself j je jm jo join jp just k ke keep keeps kept keys kg kh ki km kn know known knows kp kr kw ky kz l la largely last lately later latter latterly lb lc least less lest let let's lets li like liked likely line little lk ll look looking looks lr ls lt ltd lu lv ly m ma made mainly make makes many may maybe mc md me mean means meantime meanwhile merely mg mh microsoft might mil million miss mk ml mm mn mo more moreover most mostly mp mq mr mrs ms msie mt mu much mug must mv mw mx my myself mz n na name namely nay nc nd ne near nearly necessarily necessary need needs neither net netscape never nevertheless new next nf ng ni nine ninety nl no nobody non none nonetheless noone nor normally nos not noted nothing now nowhere np nr nu NULL nz o obtain obtained obviously of off often oh ok okay old om omitted on once one one's ones only onto or ord org other others otherwise ought our ours ourselves out outside over overall owing own p pa page pages part particular particularly past pe per perhaps pf pg ph pk pl placed please plus pm pn poorly possible possibly potentially pp pr predominantly present previously primarily probably promptly proud provides pt put pw py q qa que quickly quite qv r ran rather rd re readily really recent recently ref refs regarding regardless regards related relatively research reserved respectively resulted resulting results right ring ro ru run rw s sa said same saw say saying says sb sc sd se sec section see seeing seem seemed seeming seems seen self selves sent seven seventy several sg sh shall she she'd she'll she's shed shes should shouldn shouldn't show showed shown showns shows si significant significantly similar similarly since site six sixty sj sk sl slightly sm sn so some somebody somehow someone somethan something sometime sometimes somewhat somewhere soon sorry specifically specified specify specifying sr st state states still stop strongly su sub substantially successfully such sufficiently suggest sup sure sv sy sz t take taken taking tc td tell ten tends test text tf tg th than thank thanks thanx that that'll that's that've thats the their theirs them themselves then thence there there'll there's there've thereafter thereby thered therefore therein thereof therere theres thereto thereupon these they they'd they'll they're they've theyd theyre think thirty this those thou though thoughh thousand three throug through throughout thru thus til tip tj tk tm tn to together too took toward towards tp tr tried tries trillion truly try trying ts tt tv tw twenty twice two tz u ua ug uk um un under unfortunately unless unlike unlikely until unto up upon ups us use used useful usefully usefulness uses using usually uy uz v va value various vc ve very vg vi via viz vn vol vols vs vu w want wants was wasn wasn't way we we'd we'll we're we've web webpage website wed welcome well went were weren weren't wf what what'll what's whatever whats when whence whenever where whereafter whereas whereby wherein wheres whereupon wherever whether which while whim whither who who'd who'll who's whod whoever whole whom whomever whos whose why widely will willing wish with within without won won't words world would wouldn wouldn't ws www x y ye yes yet you you'd you'll you're you've youd your youre yours yourself yourselves yt yu z za zero zm zr times subscribe twitter log login";
}