import { scaleModerate, scaleVertical, scale } from '../util/Scale';
import * as COLOR from './Colors';

export const shadow = {
  lg: {
    // elevation: 50,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },

  md: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      height: 4,
      width: 4
    }
  },

  sm: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },

  ssm: {
    elevation: 1.5,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },

  xlg: {
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      height: 10,
      width: 10
    }
  },
};

export const texts = {
  h0: {
    fontSize: scaleModerate(28),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },
  h1: {
    fontSize: scaleModerate(24),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  l_h1: {
    fontSize: scaleModerate(24),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,

  },

  r_h1: {
    fontSize: scaleModerate(24),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  h2: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  l_h2: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
  },

  l_h2_orange: {
    fontSize: scale(16),
    color: COLOR.NL_ORANGE,
  },

  h2_orange: {
    fontSize: scale(16),
    color: COLOR.NL_ORANGE,
    textAlign: 'center'
  },

  r_h2: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  h5: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  h3: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  h3_orange: {
    fontSize: scale(16),
    color: COLOR.NL_ORANGE,
    textAlign: 'center',

  },

  l_h3: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,

  },

  r_h3: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },
  h4: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.PRIMARY_COLOR,
    textAlign: 'center',

  },
  h4_orange: {
    fontSize: scale(16),
    color: COLOR.NL_ORANGE,
    textAlign: 'center',

  },

  l_h4: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'left'
  },

  r_h4: {
    fontSize: scale(16),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',
  },

  r_h5: {
    fontSize: scale(13),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  l_h5: {
    fontSize: scale(13),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,

  },

  normal: {
    fontSize: scale(13),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  white_bold: {
    fontSize: scale(13),
    fontWeight: 'bold',
    color: COLOR.WHITE,
    textAlign: 'center',

  },

  l_normal: {
    fontSize: scale(13),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'left'
  },

  l_bold: {
    fontSize: scale(13),
    fontWeight: 'bold',
    color: COLOR.TEXT_LABEL,
    textAlign: 'left'
  },

  bold: {
    fontSize: scale(13),
    fontWeight: 'bold',
    color: COLOR.TEXT_LABEL,
    textAlign: 'center'
  },

  r_normal: {
    fontSize: scale(13),
    fontWeight: 'normal',
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',
  },
  l_sm: {
    fontSize: scale(13),
    color: COLOR.TEXT_LABEL,
    textAlign: 'left',

  },

  l_placeholder: {
    fontSize: scale(13),
    color: COLOR.PLACEHOLDER_TEXT,
    textAlign: 'left',
  },

  placeholder: {
    fontSize: scale(13),
    color: COLOR.PLACEHOLDER_TEXT,
    textAlign: 'center',
  },

  sm: {
    fontSize: scale(13),
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',
    fontWeight: 'normal',
  },

  sm_l_error: {
    fontSize: scale(13),
    color: COLOR.ERROR,
    textAlign: 'left',
  },
  sm_error: {
    fontSize: scale(13),
    color: COLOR.ERROR,
    textAlign: 'center',

  },

  sm_placeholder: {
    fontSize: scale(13),
    color: COLOR.PLACEHOLDER_TEXT,
    textAlign: 'center',
  },

  sm_bold: {
    fontSize: scale(13),
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  md: {
    fontSize: scale(13),
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',
    fontWeight: 'normal',

  },

  r_sm: {
    fontSize: scale(13),
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',
    fontWeight: 'normal',

  },
  r_ssm: {
    fontSize: scaleModerate(10),
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  ssm: {
    fontSize: scaleModerate(10),
    color: COLOR.TEXT_LABEL,
    textAlign: 'center',

  },

  r_tiny: {
    fontSize: scaleModerate(8),
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',

  },

  r_tiny_bold: {
    fontSize: scaleModerate(8),
    color: COLOR.TEXT_LABEL,
    textAlign: 'right',
    fontWeight: 'bold'
  },

  l_ssm: {
    fontSize: scaleModerate(10),
    color: COLOR.TEXT_LABEL,

  },

  gray_normal: {
    fontSize: scale(13),
    color: '#666',
    textAlign: 'center',

  },
};

export const size = {
  stiny: {
    width: scaleModerate(8),
    height: scaleModerate(8)
  },
  tiny: {
    width: scaleModerate(10),
    height: scaleModerate(10)
  },
  ssm: {
    width: scale(13),
    height: scale(13)
  },
  ssml: {
    width: scale(13),
    height: scale(13)
  },
  sml: {
    width: scale(18),
    height: scale(18)
  },
  smll: {
    width: scaleModerate(22),
    height: scaleModerate(22)
  },
  sm: {
    width: scaleModerate(24),
    height: scaleModerate(24)
  },
  xsm: {
    width: scaleModerate(28),
    height: scaleModerate(28)
  },
  smd: {
    width: scaleModerate(34),
    height: scaleModerate(34)
  },
  md: {
    width: scaleModerate(48),
    height: scaleModerate(48)
  },
  xmd: {
    width: scaleModerate(55),
    height: scaleModerate(55)
  },
  slg: {
    width: scaleModerate(60),
    height: scaleModerate(60)
  },
  slgVertical: {
    width: scaleVertical(62),
    height: scaleVertical(62)
  },
  lg: {
    width: scaleModerate(64),
    height: scaleModerate(64)
  },
  xlg: {
    width: scaleModerate(72),
    height: scaleModerate(72)
  },
  xxlg: {
    width: scaleModerate(100),
    height: scaleModerate(100)
  },
  xxxlg: {
    width: scaleModerate(150),
    height: scaleModerate(150)
  }
};
