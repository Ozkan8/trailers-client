import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  MailruShareButton,
  MailruIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

class ShareButtons extends React.Component {
  render() {
    return <div className="share-movie btn-primary pl-2 pr-2">
      <FacebookShareButton url={window.location.href} title="facebook">
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href} title="twitter">
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <RedditShareButton url={window.location.href} title="reddit">
        <RedditIcon size={32} round={true} />
      </RedditShareButton>
      <MailruShareButton url={window.location.href} title="mailru">
        <MailruIcon size={32} round={true} />
      </MailruShareButton>
    </div>
  }
}

export default ShareButtons;