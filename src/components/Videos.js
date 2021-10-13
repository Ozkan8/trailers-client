import React from 'react';

class Videos extends React.Component {

  formatDate = (dateTime) => {

    if (dateTime == null) return '/';

    Number.prototype.padLeft = function (base, chr) {
      var len = String(base || 10).length - String(this).length + 1;
      return len > 0 ? new Array(len).join(chr || '0') + this : this;
    };

    var date = new Date(dateTime),
      dformat =
        [
          date.getDate().padLeft(),
          (date.getMonth() + 1).padLeft(),
          date.getFullYear(),
        ].join('/')

    return dformat;
  }

  render() {

    let videos = [];
    let firstVideo = null;

    if (this.props.movie.videos.length) {
      firstVideo = <section>
        <iframe title="Movie trailer" width="100%" height="400px" src={"https://www.youtube.com/embed/" + this.props.video.id} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <p>
          <span className="d-block font-weight-bold">{this.props.video.title}</span>
          <span className="d-block mt-1" style={{ fontSize: "14px" }}>{this.props.video.channel_title}</span>
          <span className="d-block mt-1" style={{ fontSize: "14px" }}>{this.formatDate(this.props.video.published_at)}</span>
        </p>
      </section>
    } else {
      // Possible API quota error
      firstVideo = <p className="font-weight-bold" style={{ fontSize: "22px" }}>Not found any trailer!</p>
    }

    this.props.movie.videos.map((video, i) => {
      return videos.push(
        <div key={i} className="row other-videos">
          <div className="col-md-6">
            <img
              data-video={JSON.stringify(video)}
              alt={video.title}
              src={video.thumbnail}
              style={{
                width: "150px",
                borderRadius: "10px",
                cursor: "pointer",
                borderWidth: "4px",
                borderStyle: "solid",
                borderColor: this.props.video.id === video.id ? "green" : "transparent"
              }}
              onClick={this.props.handleIframes}
            />
          </div>
          <div className="pl-0 col-md-6">
            <p>
              <span className="d-block font-weight-bold" title={video.title}>{video.title.substring(0, 16)}...</span>
              <span className="d-block mt-1" style={{ fontSize: "14px" }}>{video.channel_title}</span>
              <span className="d-block mt-1" style={{ fontSize: "14px" }}>{this.formatDate(video.published_at)}</span>
            </p>
          </div>
        </div>
      );
    });

    return <div className='row mt-4 mb-5'>
      <div className="col-md-8 pl-0">
        {firstVideo}
      </div>
      <div className="col-md-4">
        {videos}
      </div>
    </div>
  }
}

export default Videos;