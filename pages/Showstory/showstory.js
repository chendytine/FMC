// pages/Showstory/showstory.js
Page({

  /**
   * Page initial data
   */
  data: {
    story:{},
    comments:[],
    votes:{},
    sid: ''
  },

  getResult(res) {
    console.log(res)
    this.setData({
      story:res.data
    })
  },

  getCommentResult(res) {
    console.log(res)
    this.setData({
      comments: res.data.objects
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      sid: options.sid
    })

    const id = {
      url: `https://cloud.minapp.com/oserve/v1/table/84988/record/${options.sid}`,
      method: 'GET',
      header: {
        Authorization: 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'
      },
      success: this.getResult
    }
    wx.request(id)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
   
    const request = {
      url: `https://cloud.minapp.com/oserve/v1/table/85188/record?story_id=${this.data.sid}&limit=100`,
      method: 'GET',
      header: {
        Authorization: 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'
      },
      success: this.getCommentResult
    }
    wx.request(request)
  },

  submitComment(event) {
    console.log(event.detail.value)
    const comment = event.detail.value
    comment.story_id = this.data.sid
    const request = {
      url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
      method: 'POST',
      data: comment,
      header: {
        Authorization: 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'
      },
      success: this.sentComment
    }
    wx.request(request)
  },

  sentComment() {
    this.onShow()
  },

  deleteComment(event) {
    const request = {
      url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${this.data.sid}`,
      method: 'DELETE',
      header: {
        Authorization: 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'
      },
      success: this.deletedComment
    }
    wx.request(request)
  },

  deletedComment() {
    this.onShow()
  },

  submitVote(event) {
    const data = event.currentTarget.dataset;
    const votes = data.votes;
    vote.story_id = this.data.sid
    const new_votes = {votes: votes + 1 }
    const request= {
      url: 'https://cloud.minapp.com/oserve/v1/table/85188/record/',
      method: 'PUT',
      header: { 'Authorization': 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' }, 
      data: new_votes,

      success: this.sentVote
    }
    wx.request(request)
  },

  sentVote() {
    this.onShow()
  },
  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})