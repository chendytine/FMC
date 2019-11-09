// pages/post/post.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  formSubmit(event){
    console.log(event)
    let newstory = event.detail.value
    // app.globalData.stories.unshift(newstory)
    
    wx.request({
      url:'https://cloud.minapp.com/oserve/v1/table/84988/record/',
      data: newstory,
      method:'POST',
      header: {
        Authorization: 'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'
      },
      success: this.submitSuccess
    })
  },
    
    submitSuccess(res){
      console.log('res for post', res)
      if (res.statusCode === 201){
        wx.navigateBack()
        wx.showToast({
          title: 'Success',
          icon: 'sucess'
        })
      }
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