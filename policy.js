/* Educational policy evaluator. Runs locally; it is not an authorization boundary. */
(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.PolicyDemo = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var allowed = {
    role: ["analista", "auditor", "visitante"],
    department: ["finanzas", "operaciones"],
    sensitivity: ["publico", "interno", "restringido"],
    purpose: ["analitica", "auditoria", "marketing"]
  };

  function evaluate(input) {
    var validObject = input !== null && typeof input === "object" && !Array.isArray(input);
    var labels = {
      role: "Rol reconocido",
      department: "Departamento reconocido",
      sensitivity: "Sensibilidad reconocida",
      purpose: "Propósito reconocido"
    };
    var checks = Object.keys(allowed).map(function (key) {
      return {
        label: labels[key],
        pass: !!(validObject && Object.prototype.hasOwnProperty.call(input, key) &&
          allowed[key].indexOf(input[key]) !== -1)
      };
    });

    if (!checks.every(function (check) { return check.pass; })) {
      return {
        decision: "deny",
        title: "Acceso denegado",
        reason: "Faltan atributos válidos. La política deniega por defecto cuando no puede evaluar el contexto.",
        checks: checks,
        obligations: []
      };
    }

    var isPublic = input.sensitivity === "publico";
    var roleAllowed = input.role !== "visitante";
    var purposeAllowed = isPublic ||
      (input.role === "analista" && input.purpose === "analitica") ||
      (input.role === "auditor" && input.purpose === "auditoria");
    var departmentAllowed = isPublic || input.role === "auditor" || input.department === "finanzas";

    checks.push({ label: "RBAC · el rol tiene permiso de lectura", pass: roleAllowed });
    checks.push({
      label: isPublic ? "ABAC · el recurso público admite los propósitos definidos" :
        "ABAC · el propósito corresponde a la función del usuario",
      pass: purposeAllowed
    });
    checks.push({
      label: isPublic ? "ABAC · el recurso público admite ambos departamentos" :
        input.role === "auditor" ? "ABAC · auditoría tiene alcance entre departamentos" :
        "ABAC · el departamento coincide con el dueño: finanzas",
      pass: departmentAllowed
    });

    var reason;
    if (!roleAllowed) {
      reason = "El rol visitante no tiene permiso de lectura sobre finanzas.movimientos, incluso si se clasifica como público.";
    } else if (!purposeAllowed) {
      reason = input.role === "auditor" ?
        "El auditor solo puede consultar datos no públicos con propósito de auditoría." :
        "El analista solo puede consultar datos no públicos con propósito de analítica.";
    } else if (!departmentAllowed) {
      reason = "El recurso pertenece a finanzas. El rol analista necesita pertenecer a ese departamento para consultar datos no públicos.";
    }

    if (reason) {
      return { decision: "deny", title: "Acceso denegado", reason: reason, checks: checks, obligations: [] };
    }

    if (input.sensitivity === "restringido") {
      return {
        decision: "mask",
        title: "Acceso con enmascaramiento",
        reason: "Rol, propósito y ámbito cumplen la política; la sensibilidad restringida exige ocultar identificadores antes de entregar el resultado.",
        checks: checks,
        obligations: ["Enmascarar identificadores antes de entregar filas.", "Registrar la decisión y la versión de la política."]
      };
    }

    return {
      decision: "allow",
      title: "Acceso permitido",
      reason: isPublic ?
        "El rol tiene lectura y el recurso público admite los propósitos y departamentos definidos en esta demostración." :
        "Los atributos cumplen la política de lectura para datos internos de finanzas.movimientos.",
      checks: checks,
      obligations: ["Registrar la decisión y la versión de la política."]
    };
  }

  return Object.freeze({ evaluate: evaluate });
});
