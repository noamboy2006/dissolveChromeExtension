/* global chrome */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (!(tab.url.startsWith('https://') || tab.url.startsWith('http://')) || !tab.active) return
    chrome.tabs.executeScript(tabId, { code: go.toString() + '\n go()' }, (res) => {})
  }
})

function go () {
  setTimeout(() => {
    if (window.location.href.startsWith('https://open.spotify.com/playlist/') || window.location.href.startsWith('https://open.spotify.com/album/')) {
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
    }
  }, 1000)
}
