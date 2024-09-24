export const BREAKPOINTS_MAP = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,

  xsMax: 480 - 1,
  smMax: 576 - 1,
  mdMax: 768 - 1,
  lgMax: 992 - 1,
  xlMax: 1200 - 1,
  xxlMax: 1600 - 1,
};

export const BREAKPOINTS_MEDIA_MAP = {
  xs: `(min-width: ${BREAKPOINTS_MAP.xs}px)`,
  sm: `(min-width: ${BREAKPOINTS_MAP.sm}px)`,
  md: `(min-width: ${BREAKPOINTS_MAP.md}px)`,
  lg: `(min-width: ${BREAKPOINTS_MAP.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS_MAP.xl}px)`,
  xxl: `(min-width: ${BREAKPOINTS_MAP.xxl}px)`,

  xsMax: `(max-width: ${BREAKPOINTS_MAP.xsMax}px)`,
  smMax: `(max-width: ${BREAKPOINTS_MAP.smMax}px)`,
  mdMax: `(max-width: ${BREAKPOINTS_MAP.mdMax}px)`,
  lgMax: `(max-width: ${BREAKPOINTS_MAP.lgMax}px)`,
  xlMax: `(max-width: ${BREAKPOINTS_MAP.xlMax}px)`,
  xxlMax: `(max-width: ${BREAKPOINTS_MAP.xxlMax}px)`,
};
