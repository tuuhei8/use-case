
document.getElementById('luoTili').addEventListener('click', luo)
document.getElementById('kirjauduTilille').addEventListener('click', kirjaudu)
document.getElementById('lisaa').addEventListener('click', createVote)
document.getElementById('poista').addEventListener('click', deleteVote)
var kayttajat = []
var kayttaja = ''
var aanestykset = []


function paivita() {
    if (tarkistaAanestysTila()) {
        lataaAanestykset()
        printVotes()
    }
    console.log(tarkistaTila(), 'a')
    if (tarkistaTila() === true) {
        lataaLogin()
        if (kayttajat.length > 0) {
            for (i = 0; i < kayttajat.length; i++) {
                console.log('asaadaddsd')
                if (kayttajat[i].lgin === true) {
                    login(kayttajat[i].nimi, kayttajat[i].psw)
                }
            }
        }
    }
}

function asetaTila(tila) {
    let loggedIn = tila
    let loginState = JSON.stringify(loggedIn)
    sessionStorage.setItem('logged', loginState)
}

function tarkistaTila() {
    let tila = sessionStorage.getItem('logged')
    let boolean = JSON.parse(tila)
    return boolean;
}

function tallennaLogin() {
    const myJSON = JSON.stringify(kayttajat);
    sessionStorage.setItem('data', myJSON)
}

function lataaLogin() {
    let data = sessionStorage.getItem('data')
    let arr = JSON.parse(data);
    kayttajat = arr;
    console.log(arr)
}

function asetaAanestysTila(aanestysTila) {
    let aansetysTila = aanestysTila
    let voteState = JSON.stringify(aansetysTila)
    sessionStorage.setItem('votes', voteState)
}

function tarkistaAanestysTila() {
    let aanestysTila = sessionStorage.getItem('votes')
    let boolean = JSON.parse(aanestysTila)
    return boolean;
}

function tallennaAanestykset() {
    const myJSON = JSON.stringify(aanestykset);
    sessionStorage.setItem('voteData', myJSON)
}

function lataaAanestykset() {
    let data = sessionStorage.getItem('voteData')
    let arr = JSON.parse(data);
    aanestykset = arr;
    console.log(arr)
}

function luo() {
    const nimi = document.getElementById('suname').value
    const psw = document.getElementById('supsw').value
    const vpsw = document.getElementById('supsw-repeat').value
    const admin = document.getElementById('createAdmin').checked
    if (kayttajat.length > 0) {
        for (i = 0; i < kayttajat.length; i++) {
            if (kayttajat[i].nimi === nimi) {
                alert('Käyttäjänimi on varattu.')
                return;
            }
        }
    }
    if (nimi.length > 0 && psw.length > 0 && psw == vpsw) {
        kayttajat.push(new User(nimi, psw, admin))
        console.log(kayttajat,'QQQQQ')
    } else {
        alert('Virhe')
    }
    tallennaLogin()
    login(nimi, psw)
        console.log(admin)
}

function kirjaudu() {
    const nimi = document.getElementById('siuname').value
    const psw = document.getElementById('sipsw').value
    login(nimi, psw)
}

function login(nimi, psw) {
    lataaLogin()
    if (kayttajat.length > 0) {
        for (i = 0; i < kayttajat.length; i++) {
            if (kayttajat[i].nimi === nimi && kayttajat[i].psw === psw) {
                asetaTila(true)
                kayttajat[i].lgin = true
                console.log(kayttajat[i].lgin, 'asxacsfbggnhmmjkjnfgvv')
                kayttaja = kayttajat[i].nimi
                document.getElementById('notLogged').style.display = 'none'
                if (kayttajat[i].admin === true) {
                    document.getElementById('knimi').innerHTML = kayttaja + ' (Admin)'
                    let btn = document.createElement('button')
                    btn.innerHTML = 'Luo äänestys'
                    btn.setAttribute('type', 'button')
                    btn.setAttribute('class', 'btn btn-success m-1')
                    btn.setAttribute('id', 'luoAanestys')
                    btn.setAttribute('onclick', 'document.getElementById("id03").style.display="block"')
                    document.getElementById('logged').appendChild(btn)
                    let btn2 = document.createElement('button')
                    btn2.innerHTML = 'Poista äänestys'
                    btn2.setAttribute('type', 'button')
                    btn2.setAttribute('class', 'btn btn-success m-1')
                    btn2.setAttribute('id', 'poistaAanestys')
                    btn2.setAttribute('onclick', 'document.getElementById("id04").style.display="block"')
                    document.getElementById('logged').appendChild(btn2)
                } else {
                    document.getElementById('knimi').innerHTML = kayttaja
                }
                tallennaLogin()
                console.log('GGG')
                document.getElementById('logged').style.display = ''
            } 
        }
    } else {
        alert('Ei rekisteröityneitä käyttäjiä.')
    }
    
}

function e() {
    
        const kortti = (new Card("Musta vai valkoinen?", "Musta", "Valkoinen"))
        aanestykset.push(kortti)
        tallennaAanestykset()
        printVotes()
        console.log(aanestykset, 'vain kerran')
    
}
function c() {
    
        const kortti = (new Card(" asaddasas", "Musta", "Valkoinen"))
        aanestykset.push(kortti)
        tallennaAanestykset()
        printVotes()
        console.log(aanestykset, 'vain kerran')
    
}

function logout() {
    if (tarkistaTila() === true) {
        document.getElementById('logged').style.display = 'none'
        document.getElementById('notLogged').style.display = ''
        document.getElementById('knimi').innerHTML = ''
        asetaTila(false)
        for (i = 0; i < kayttajat.length; i++) {
            if (kayttajat[i].lgin === true) {
                kayttajat[i].lgin = false
            }
        }
        tallennaLogin()
        console.log('logout funktio')
    }
}

function User(nimi, psw, admin) {
    this.nimi = nimi
    this.psw = psw
    this.admin = admin
    this.lgin = false
}

function createVote() {
    let otsikko = document.getElementById('lisaaOtsikko').value
    let valinta1 = document.getElementById('valinta1').value
    let valinta2 = document.getElementById('valinta2').value
    const kortti = (new Card(otsikko, valinta1, valinta2))
    aanestykset.push(kortti)
    tallennaAanestykset()
    printVotes()
}

function deleteVote() {
    console.log('LLLLLLLLLLLLLLL')
    let otsikko = document.getElementById('poisto').value
    for (i = 0; i < aanestykset.length; i++) {
        if (otsikko == aanestykset[i].otsikko) {
            console.log('RRRRRRRRRRRRRRR')
            aanestykset.splice(i, 1)
            sessionStorage.removeItem('voteData')
            tallennaAanestykset()
            printVotes()
        }
    }
}

function printVotes() {
    lataaAanestykset()
    let tarkistus = false
    if (document.getElementsByClassName('col').length > 0) {
        tarkistus = true
    }
    for (i = 0; i < aanestykset.length; i++) {
        if (tarkistus === true) {
            console.log(document.getElementsByClassName('col')[i].children[0].children[0].children[0].innerHTML, 'PRTGHH')
            let a = document.getElementsByClassName('col')[i].children[0].children[0].children[0].innerHTML
            if (a == aanestykset[i].otsikko) {
                document.location.reload();
                console.log('tupla')
            }
        }
        //kolumni
        let div0 = document.createElement('div')
        div0.setAttribute('class', 'col')
        //Kortti
        let div1 = document.createElement('div')
        div1.setAttribute('class', 'card p-2')
        let div2 = document.createElement('div')
        div2.setAttribute('class', 'card-body')
        //Otsikko
        let h5 = document.createElement('h5')
        h5.setAttribute('class', 'card-title')
        h5.innerHTML = aanestykset[i].otsikko
        //Ensimmäinen äänestysvaihtoehto
        let div3 = document.createElement('div')
        div3.setAttribute('class', 'p-1')
        let span1 = document.createElement('span')
        span1.innerHTML = aanestykset[i].valinta1 + ' '
        let span2 = document.createElement('span')
        span2.innerHTML = aanestykset[i].aanimaara1
        let div4 = document.createElement('div')
        let button1 = document.createElement('button')
        button1.setAttribute('onclick', `vote("${aanestykset[i].otsikko}", 1)`)
        button1.setAttribute('class', 'btn btn-info mt-2')
        button1.setAttribute('type', 'submit')
        button1.innerHTML = 'Äänestä'
        let hr = document.createElement('hr')
        //Toinen äänestysvaihtoehto
        let div5 = document.createElement('div')
        div3.setAttribute('class', 'p-1')
        let span3 = document.createElement('span')
        span3.innerHTML = aanestykset[i].valinta2 + ' '
        let span4 = document.createElement('span')
        span4.innerHTML = aanestykset[i].aanimaara2
        let div6 = document.createElement('div')
        let button2 = document.createElement('button')
        button2.setAttribute('onclick', `vote("${aanestykset[i].otsikko}", 2)`)
        button2.setAttribute('class', 'btn btn-info mt-2')
        button2.setAttribute('type', 'submit')
        button2.innerHTML = 'Äänestä'
        div6.appendChild(button2)
        div5.appendChild(span3)
        div5.appendChild(span4)
        div5.appendChild(div6)
        div4.appendChild(button1)
        div3.appendChild(span1)
        div3.appendChild(span2)
        div3.appendChild(div4)
        div2.appendChild(h5)
        div1.appendChild(div2)
        div1.appendChild(div3)
        div1.appendChild(hr)
        div1.appendChild(div5)
        div0.appendChild(div1)
        document.getElementById('voteArea').appendChild(div0)
        asetaAanestysTila(true)
    }
}

function Card(otsikko, valinta1, valinta2) {
    this.otsikko = otsikko
    this.valinta1 = valinta1
    this.valinta2 = valinta2
    this.aanimaara1 = 0
    this.aanimaara2 = 0
}

function vote(otsikko, nappi) {
    if (tarkistaTila()) {
        for (i = 0; i < aanestykset.length; i++) {
            if (aanestykset[i].otsikko == otsikko) {
                if (nappi == 1) {
                    aanestykset[i].aanimaara1 = aanestykset[i].aanimaara1 + 1;
                } else {
                    aanestykset[i].aanimaara2 = aanestykset[i].aanimaara2 + 1;
                }
                tallennaAanestykset()
                printVotes()
            }
        }
    }
}