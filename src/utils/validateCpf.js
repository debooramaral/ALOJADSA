function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); // Remover caracteres não numéricos

    if (cpf.length !== 11) return false;  // CPF deve ter 11 dígitos

    // Verificar se o CPF contém 11 dígitos repetidos (como 11111111111, 22222222222)
    if (/(\d)\1{10}/.test(cpf)) return false;

    let sum = 0;
    let rest;

    // Verificar primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    rest = sum % 11;
    rest = (rest < 2) ? 0 : 11 - rest;
    if (rest !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    // Verificar segundo dígito verificador
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = sum % 11;
    rest = (rest < 2) ? 0 : 11 - rest;
    if (rest !== parseInt(cpf.charAt(10))) return false;

    return true; // CPF válido
}
