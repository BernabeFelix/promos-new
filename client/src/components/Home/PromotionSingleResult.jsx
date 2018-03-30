import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from 'material-ui';
import { promotionUrl } from '../../routes';
import { Promotion } from './types';

const PromotionSingleResult = ({ description, id, imgUrl, title }) => (
  <Link to={promotionUrl({ id })}>
    <Paper className="promotion-single-result" zDepth={2}>
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <div className="img-container">
            <img className="img-responsive" src={imgUrl} alt="" />
          </div>
        </div>
        <div className="col-xs-12 col-sm-9">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Paper>
  </Link>
);

PromotionSingleResult.propTypes = Promotion;

export default PromotionSingleResult;
