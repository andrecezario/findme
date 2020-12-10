import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Spinner from 'react-spinners/PuffLoader';
import { css } from '@emotion/core';

export const style = css`
  position: fixed;
  display: flex;
  padding: 0;
  margin: 0 auto;
  justify-content: center;
  z-index: 2000 !important;
  margin-top: 40vh;
  left: 0;
  right: 0;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    background: theme.palette.light.main,
    opacity: 0.75,
    zIndex: 1000
  }
}));

const CustomSpinner = ({loading}) => {
  const classes = useStyles()
  return loading && (
  <div className={classes.container}>
    <Spinner color="#00c853" css={style} size={120} loading={loading} />
  </div>
  );
};

export default CustomSpinner;