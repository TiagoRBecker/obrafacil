export interface SecurityConfig {
  jwtAccessSecret: string;
  jwtAccessExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
}

export default (): { security: SecurityConfig } => ({
  security: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'change-me-in-production',
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '55m',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'change-me-in-production',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '15d',
  },
});
