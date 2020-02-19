/**
 * @type {import("./src").AuditPluginOptions}
 */
const auditPlugin = {
  auditEventConnection: true,
  firstLastAuditEvent: true,
  dateProps: true,
  nameProps: true,
  nameSource: "session_info",
  nameSessionInfoJsonPath: "{userId}"
};

module.exports = {
  options: {
    graphileBuildOptions: {
      auditPlugin
    },
    async pgSettings(req) {
      const claims = getClaimsFromRequest(req);
      return {
        "pgmemento.session_info": JSON.stringify({
          userId: claims.name
        })
      };
    },
    jwtSecret: "my-jwt-secret"
  }
};

function getClaimsFromRequest(req) {
  try {
    const { authorization } = req.headers;
    const [, token] = /^\s*bearer\s+(.*?)\s*$/i.exec(authorization);
    const [, claims] = token.split(".");
    return JSON.parse(Buffer.from(claims, "base64").toString());
  } catch {
    return {};
  }
}
