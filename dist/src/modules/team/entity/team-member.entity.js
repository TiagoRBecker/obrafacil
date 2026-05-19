"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberEntity = void 0;
class TeamMemberEntity {
    constructor(props) {
        this.props = props;
        Object.assign(this, props);
    }
    static create(props) {
        return new TeamMemberEntity({
            ...props
        });
    }
    static toDTO(props) {
        return new TeamMemberEntity({
            ...props,
        });
    }
    get data() {
        return this.props;
    }
}
exports.TeamMemberEntity = TeamMemberEntity;
//# sourceMappingURL=team-member.entity.js.map