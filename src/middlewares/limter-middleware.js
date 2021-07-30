exports.videoLimiter = (cofig) => {
  /**
   * - user가 로그인 되있는지 확인
   * - user가 x
   *     - video 객체 있는지 확인
   *     -     - 만료시간이 지나면 response에 중지
   *     - session에 video(제한시간, 사용량)객체 설정
   */
  const validTime = 60 * 60;

  return function (req, res, next) {
    if (req.user) {
      return res.send('ok');
    }
    if (req.session.video) {
      const videoSess = req.session.video;
      if (videoSess.useTime > videoSess.expires) {
        return res.send('expires');
      }
    } else {
      //   const now = Date.now();
      //   const expires = now.getSeconds() + validTime;
      req.session['video'] = {
        useTime: 0,
        validTime: validTime,
      };
    }
    next();
  };
};
