/* global chrome */

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (!(tab.url.startsWith('https://') || tab.url.startsWith('http://')) || !tab.active) return
    chrome.tabs.executeScript(tabId, { code: go.toString() + '\n go()' }, (res) => {})
  }
})

function go () {
  if (window.location.href.startsWith('https://open.spotify.com/')) {
    // spotify

    // playlist/album duration 표시 부분
    if (window.location.href.startsWith('https://open.spotify.com/playlist/') || window.location.href.startsWith('https://open.spotify.com/album/')) {
      setTimeout(() => {
        const time = [0, 0]
        for (let i = 0; i < document.getElementsByClassName('tracklist-duration').length; i++) {
          const min = parseInt(document.getElementsByClassName('tracklist-duration')[i].getElementsByTagName('span')[0].innerHTML.split(':')[0])
          const sec = parseInt(document.getElementsByClassName('tracklist-duration')[i].getElementsByTagName('span')[0].innerHTML.split(':')[1])
          time[1] += sec
          if (time[1] >= 60) {
            time[1] -= 60
            time[0]++
          }
          time[0] += min
        }
        document.getElementsByClassName('TrackListHeader__entity-additional-info')[0].innerHTML += ' • ' + time[0] + '분 ' + time[1] + '초'
      }, 500)
    }

    // analyze 부분
    const anal = () => {
      const searchButton = document.getElementsByTagName('button')
      let isOn = 0
      for (let i = 0; i < searchButton.length; i++) {
        if (searchButton[i].title === '일시 정지하기') {
          isOn = 1
          break
        }
      }
      if (!isOn) return
      const song = document.getElementsByClassName('now-playing-bar__left')[0].getElementsByTagName('a')[1].innerHTML
      let artist = ''
      const xhttp = new XMLHttpRequest()
      for (let i = 2; i < document.getElementsByClassName('now-playing-bar__left')[0].getElementsByTagName('a').length; i++) {
        artist += document.getElementsByClassName('now-playing-bar__left')[0].getElementsByTagName('a')[i].innerHTML + '😷'
      }
      xhttp.onreadystatechange = () => {}
      xhttp.open('GET', 'http://127.0.0.1:8888/dissolveChromeExtension/in?song=' + song + '&artist=' + artist, true)
      xhttp.send()
    }
    setInterval(anal, 1000)
  }
}
