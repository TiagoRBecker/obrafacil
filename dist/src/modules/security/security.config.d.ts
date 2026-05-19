export interface SecurityConfig {
    jwtAccessSecret: string;
    jwtAccessExpiresIn: string;
    jwtRefreshSecret: string;
    jwtRefreshExpiresIn: string;
}
declare const _default: () => {
    security: SecurityConfig;
};
export default _default;
