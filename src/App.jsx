import React, { useState, useRef } from "react";
import {
  Play,
  Code,
  Terminal,
  Heart,
  Star,
  CheckCircle,
  XCircle,
  BookOpen,
  Bug,
  Zap,
  Lock,
  RefreshCw,
  Trophy,
  Loader,
  AlertTriangle,
  Award,
} from "lucide-react";

// --- UTILITÁRIO DE ARMAZENAMENTO SEGURO ---
const safeStorage = {
  get: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      console.warn("Storage inacessível");
    }
    return null;
  },
  set: (key, value) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      console.warn("Erro ao salvar");
    }
  },
};

// --- COMPONENTE DO EDITOR ---
const DraculaEditor = ({ code, onChange }) => {
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const handleScroll = (e) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.target.scrollTop;
      preRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const highlightCode = (input) => {
    if (!input) return "";
    let html = input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return html
      .split("\n")
      .map((line) => {
        const commentIdx = line.indexOf("//");
        if (commentIdx !== -1) {
          const codePart = line.substring(0, commentIdx);
          const commentPart = line.substring(commentIdx);
          return (
            processLine(codePart) +
            `<span style="color: #6272a4">${commentPart}</span>`
          );
        }
        return processLine(line);
      })
      .join("\n");
  };

  const processLine = (line) => {
    let res = line;
    res = res.replace(
      /(['"])(.*?)\1/g,
      '<span style="color: #f1fa8c">$1$2$1</span>',
    );
    res = res.replace(
      /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|default|class|constructor|new|this|true|false|null|undefined|extends|async|await|try|catch)\b/g,
      '<span style="color: #ff79c6">$1</span>',
    );
    res = res.replace(/\b(\d+)\b/g, '<span style="color: #bd93f9">$1</span>');
    res = res.replace(
      /\b(console|log|alert|push|pop|length|JSON|parse|stringify|Date|setTimeout|setInterval|clearInterval|addEventListener|Math|document|querySelector|map|filter|reduce|then)\b/g,
      '<span style="color: #8be9fd">$1</span>',
    );
    return res;
  };

  return (
    <div className='relative flex-1 bg-[#282a36] font-mono text-sm overflow-hidden rounded-bl-lg border-t border-slate-700'>
      <pre
        ref={preRef}
        className='absolute inset-0 p-4 m-0 pointer-events-none whitespace-pre overflow-hidden font-mono text-[#f8f8f2] leading-relaxed'
        style={{ fontFamily: "Consolas, 'Courier New', monospace" }}
        dangerouslySetInnerHTML={{ __html: highlightCode(code) + "<br/>" }}
      />
      <textarea
        ref={textareaRef}
        value={code}
        onChange={onChange}
        onScroll={handleScroll}
        className='absolute inset-0 w-full h-full p-4 m-0 bg-transparent text-transparent caret-[#f8f8f2] resize-none border-none outline-none whitespace-pre overflow-auto leading-relaxed'
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          color: "transparent",
        }}
        spellCheck='false'
        autoCapitalize='none'
      />
    </div>
  );
};

// --- CURRÍCULO COMPLETO (49 Níveis - NARRATIVA RPG) ---
const LEVELS = [
  // --- VARIÁVEIS ---
  {
    id: 1,
    category: "Variáveis",
    difficulty: "Fácil",
    title: "O Despertar da Variável",
    story:
      "Você acorda em uma masmorra digital escura. Para iluminar o caminho, você precisa criar uma luz. No mundo do JS, 'var', 'let' e 'const' guardam poderes.",
    objective:
      "Declare uma variável chamada 'luz' e atribua a ela o valor 'acesa'.",
    initialCode: "// Digite seu código abaixo\n",
    hint: "let luz = 'acesa';",
    solutionRegex: /(let|const|var)\s+luz\s*=\s*['"`]acesa['"`]/,
    expectedOutput: "A luz se acende! O caminho se revela.",
    xpReward: 30,
  },
  {
    id: 2,
    category: "Variáveis",
    difficulty: "Médio",
    title: "O Pergaminho Imutável",
    story:
      "Você encontra um pergaminho antigo com uma lei mágica. Leis antigas não podem ser mudadas (são constantes).",
    objective: "Declare uma constante chamada 'LEI' com o valor 'nao_mataras'.",
    initialCode: "// Declare a lei imutável\n",
    hint: "const LEI = 'nao_mataras';",
    solutionRegex: /const\s+LEI\s*=\s*['"`]nao_mataras['"`]/,
    expectedOutput: "Lei gravada na pedra.",
    xpReward: 50,
  },
  {
    id: 3,
    category: "Variáveis",
    difficulty: "Difícil",
    title: "A Poção de Mana",
    story:
      "Sua mana está baixa. A variável 'mana' pode variar. Ela começa em 10, mas você bebe uma poção e ela vira 100.",
    objective:
      "Declare 'mana' com 10. Na linha de baixo, mude 'mana' para 100.",
    initialCode: "// Recupere sua mana\nlet mana = 10;\n",
    hint: "mana = 100;",
    solutionRegex: /mana\s*=\s*100/,
    expectedOutput: "Mana restaurada! Poder total.",
    xpReward: 80,
  },

  // --- OPERADORES ---
  {
    id: 4,
    category: "Operadores",
    difficulty: "Fácil",
    title: "Soma de Força",
    story:
      "Um portão pesado bloqueia o caminho. Você precisa somar sua força básica com um bônus.",
    objective: "Crie uma variável 'forca' = 10 + 10.",
    initialCode: "// Some sua força\n",
    hint: "let forca = 10 + 10;",
    solutionRegex: /forca\s*=\s*10\s*\+\s*10/,
    expectedOutput: "Força total: 20",
    xpReward: 30,
  },
  {
    id: 5,
    category: "Operadores",
    difficulty: "Médio",
    title: "Divisão de Loot",
    story:
      "Você encontrou 10 moedas de ouro e precisa dividir entre 3 companheiros. O que sobrar é seu.",
    objective: "Crie 'sobra' = 10 % 3.",
    initialCode: "// Calcule o resto\n",
    hint: "let sobra = 10 % 3;",
    solutionRegex: /sobra\s*=\s*10\s*%\s*3/,
    expectedOutput: "Sobrou: 1 moeda",
    xpReward: 50,
  },
  {
    id: 6,
    category: "Operadores",
    difficulty: "Difícil",
    title: "Level Up!",
    story:
      "Você derrotou um slime! Sua experiência aumentou. Use um atalho mágico para somar.",
    objective: "Aumente 'xp' em 50 usando +=.",
    initialCode: "let xp = 100;\n// Aumente 50\n",
    hint: "xp += 50;",
    solutionRegex: /xp\s*\+=\s*50/,
    expectedOutput: "XP Atualizado: 150",
    xpReward: 80,
  },

  // --- CONDICIONAIS ---
  {
    id: 7,
    category: "Condicionais",
    difficulty: "Fácil",
    title: "O Guardião",
    story:
      "O Guardião da Ponte exige uma senha. Se você souber, ele te deixará passar.",
    objective: "Se 'senha' for 'melo', log 'Entrar'.",
    initialCode: "let senha = 'melo';\n// Escreva o if\n",
    hint: "if (senha === 'melo') { console.log('Entrar'); }",
    solutionRegex:
      /if\s*\(\s*senha\s*===\s*['"`]melo['"`]\s*\)\s*\{?\s*console\.log/,
    expectedOutput: "Porta Aberta",
    xpReward: 30,
  },
  {
    id: 8,
    category: "Condicionais",
    difficulty: "Médio",
    title: "Vida ou Morte",
    story:
      "Em batalha, se sua vida acabar, é o fim. O código precisa saber o que fazer.",
    objective: "Adicione else para logar 'Game Over'.",
    initialCode:
      "let vida = 0;\nif (vida > 0) {\n  console.log('Lutar');\n} \n// Else aqui",
    hint: "else { console.log('Game Over'); }",
    solutionRegex: /else\s*\{?\s*console\.log/,
    expectedOutput: "Game Over",
    xpReward: 50,
  },
  {
    id: 9,
    category: "Condicionais",
    difficulty: "Difícil",
    title: "A Chave Mestra",
    story: "Para abrir o baú lendário, você precisa da Chave E do Mapa.",
    objective: "Se 'temChave' E 'temMapa' forem true, log 'Sucesso'.",
    initialCode: "let temChave=true; let temMapa=true;\n// If com &&\n",
    hint: "if (temChave && temMapa) ...",
    solutionRegex: /if\s*\(\s*temChave\s*&&\s*temMapa\s*\)/,
    expectedOutput: "Sucesso! Baú aberto.",
    xpReward: 80,
  },

  // --- SWITCH ---
  {
    id: 10,
    category: "Switch",
    difficulty: "Fácil",
    title: "O Alquimista",
    story: "O alquimista vende poções. O efeito depende do nome da poção.",
    objective: "Crie case 'cura' que log 'Curado'.",
    initialCode: "let pocao='cura';\nswitch(pocao){\n  // case...\n}",
    hint: "case 'cura': console.log('Curado'); break;",
    solutionRegex: /case\s+['"`]cura['"`]\s*:/,
    expectedOutput: "Curado",
    xpReward: 30,
  },
  {
    id: 11,
    category: "Switch",
    difficulty: "Médio",
    title: "Quebrando o Feitiço",
    story:
      "Sem o 'break', o feitiço continua e causa efeitos colaterais indesejados.",
    objective: "Adicione break no case.",
    initialCode:
      "let x=1;\nswitch(x){\n case 1: console.log('1');\n // Falta break\n}",
    hint: "break;",
    solutionRegex: /break\s*;/,
    expectedOutput: "Feitiço contido.",
    xpReward: 50,
  },
  {
    id: 12,
    category: "Switch",
    difficulty: "Difícil",
    title: "O Desconhecido",
    story:
      "Se você beber algo que o alquimista não conhece, nada deve acontecer (default).",
    objective: "Adicione default para logar 'Nada'.",
    initialCode: "let x=9;\nswitch(x){\n case 1: break;\n // Default\n}",
    hint: "default: console.log('Nada');",
    solutionRegex: /default\s*:/,
    expectedOutput: "Nada aconteceu.",
    xpReward: 80,
  },

  // --- ARRAYS ---
  {
    id: 13,
    category: "Arrays",
    difficulty: "Fácil",
    title: "Mochila de Aventureiro",
    story:
      "Você comprou uma mochila nova. Ela é uma lista (Array) onde você guarda seus itens.",
    objective: "Crie array 'mochila' com ['espada', 'escudo'].",
    initialCode: "// Crie sua mochila\n",
    hint: "let mochila = ['espada', 'escudo'];",
    solutionRegex:
      /mochila\s*=\s*\[\s*['"`]espada['"`]\s*,\s*['"`]escudo['"`]\s*\]/,
    expectedOutput: "Mochila equipada",
    xpReward: 30,
  },
  {
    id: 14,
    category: "Arrays",
    difficulty: "Médio",
    title: "Saque Rápido",
    objective: "Você precisa pegar o primeiro item da mochila rapidamente!",
    initialCode: "let items=['poção','mapa'];\n// Log índice 0\n",
    hint: "console.log(items[0]);",
    solutionRegex: /console\.log\s*\(\s*items\[0\]\s*\)/,
    expectedOutput: "Item: poção",
    xpReward: 50,
  },
  {
    id: 15,
    category: "Arrays",
    difficulty: "Difícil",
    title: "Coletando Tesouros",
    story: "Você encontrou ouro no chão. Coloque-o no final da sua mochila.",
    objective: "Adicione 'ouro' ao array 'loot' com push.",
    initialCode: "let loot=['prata'];\n// Use push\n",
    hint: "loot.push('ouro');",
    solutionRegex: /loot\.push\s*\(\s*['"`]ouro['"`]\s*\)/,
    expectedOutput: "Loot guardado",
    xpReward: 80,
  },

  // --- LOOPS ---
  {
    id: 16,
    category: "Loops",
    difficulty: "Fácil",
    title: "A Longa Caminhada",
    story: "A jornada é longa. Você precisa dar 3 passos firmes.",
    objective: "Loop de 0 a 2 (i < 3).",
    initialCode: "for(let i=0; i < __; i++){\n console.log(i);\n}",
    hint: "3",
    solutionRegex: /i\s*<\s*3/,
    expectedOutput: "Passos: 0, 1, 2",
    xpReward: 30,
  },
  {
    id: 17,
    category: "Loops",
    difficulty: "Médio",
    title: "Radar de Inimigos",
    story: "Use um loop para verificar cada inimigo na lista.",
    objective: "Loop até 'inimigos.length'.",
    initialCode:
      "let inimigos=[1,2];\nfor(let i=0; i < ___; i++){\n console.log(inimigos[i]);\n}",
    hint: "inimigos.length",
    solutionRegex: /i\s*<\s*inimigos\.length/,
    expectedOutput: "Inimigo detectado",
    xpReward: 50,
  },
  {
    id: 18,
    category: "Loops",
    difficulty: "Difícil",
    title: "Corrida de Resistência",
    story: "Enquanto você tiver estamina, continue correndo!",
    objective: "Enquanto 'stamina' > 0, log e decremente.",
    initialCode:
      "let stamina=3;\nwhile(___){\n console.log(stamina);\n stamina--;\n}",
    hint: "stamina > 0",
    solutionRegex: /while\s*\(\s*stamina\s*>\s*0\s*\)/,
    expectedOutput: "Correndo...",
    xpReward: 80,
  },

  // --- FUNÇÕES ---
  {
    id: 19,
    category: "Funções",
    difficulty: "Fácil",
    title: "Grito de Guerra",
    story: "Crie um comando de voz que você possa usar sempre.",
    objective: "Crie função 'gritar' que loga 'AAAA'.",
    initialCode: "// function gritar\n",
    hint: "function gritar() { console.log('AAAA'); }",
    solutionRegex: /function\s+gritar/,
    expectedOutput: "AAAA",
    xpReward: 30,
  },
  {
    id: 20,
    category: "Funções",
    difficulty: "Médio",
    title: "Calculadora de Dano",
    story: "Crie uma função que calcule o dano base vezes 2 (crítico).",
    objective: "Função 'dano(base)' que loga base*2.",
    initialCode: "function dano(base) {\n // log base*2\n}",
    hint: "console.log(base*2);",
    solutionRegex: /console\.log\s*\(\s*base\s*\*\s*2\s*\)/,
    expectedOutput: "Dano crítico!",
    xpReward: 50,
  },
  {
    id: 21,
    category: "Funções",
    difficulty: "Difícil",
    title: "Recompensa da Missão",
    story: "A função deve te entregar o ouro no final.",
    objective: "Função 'loot' que retorna 100.",
    initialCode: "function loot() {\n // return\n}",
    hint: "return 100;",
    solutionRegex: /return\s+100/,
    expectedOutput: "Ganhou 100 moedas",
    xpReward: 80,
  },

  // --- OBJETOS ---
  {
    id: 22,
    category: "Objetos",
    difficulty: "Fácil",
    title: "Ficha do Personagem",
    story: "Descreva seu herói usando um Objeto.",
    objective: "Objeto 'hero' com { classe: 'Guerreiro' }.",
    initialCode: "// Objeto hero\n",
    hint: "let hero = { classe: 'Guerreiro' };",
    solutionRegex: /hero\s*=\s*\{\s*classe\s*:\s*['"`]Guerreiro['"`]\s*\}/,
    expectedOutput: "Ficha criada",
    xpReward: 30,
  },
  {
    id: 23,
    category: "Objetos",
    difficulty: "Médio",
    title: "Verificando Atributos",
    story: "Acesse a força do seu personagem.",
    objective: "Log a propriedade 'for' de 'stats'.",
    initialCode: "let stats = { for: 20 };\n// log\n",
    hint: "console.log(stats.for);",
    solutionRegex: /console\.log\s*\(\s*stats\.for\s*\)/,
    expectedOutput: "Força: 20",
    xpReward: 50,
  },
  {
    id: 24,
    category: "Objetos",
    difficulty: "Difícil",
    title: "Habilidade Especial",
    story: "Seu herói aprendeu a atacar!",
    objective: "Adicione método 'atacar' que retorna 'Hit'.",
    initialCode: "let hero = {\n atacar: function() { __ }\n};",
    hint: "return 'Hit';",
    solutionRegex: /return\s+['"`]Hit['"`]/,
    expectedOutput: "Ataque: Hit",
    xpReward: 80,
  },

  // --- JSON ---
  {
    id: 25,
    category: "JSON",
    difficulty: "Fácil",
    title: "O Pergaminho Cifrado",
    story:
      "JSON é a linguagem usada para enviar mensagens secretas entre servidores.",
    objective: "String JSON: '{\"id\":1}'.",
    initialCode: "let json = ___",
    hint: "'{\"id\":1}'",
    solutionRegex: /['"`]\{\s*\\?["']id\\?["']\s*:\s*1\s*\}['"`]/,
    expectedOutput: "JSON Válido",
    xpReward: 30,
  },
  {
    id: 26,
    category: "JSON",
    difficulty: "Médio",
    title: "Escrevendo a Carta",
    story: "Transforme seu objeto em texto para enviar pelo corvo mensageiro.",
    objective: "Converta 'data' para JSON.",
    initialCode: "let data={xp:99};\nlet txt=___;",
    hint: "JSON.stringify(data)",
    solutionRegex: /JSON\.stringify\s*\(\s*data\s*\)/,
    expectedOutput: "Mensagem pronta",
    xpReward: 50,
  },
  {
    id: 27,
    category: "JSON",
    difficulty: "Difícil",
    title: "Lendo a Mensagem",
    story: "O corvo chegou! Transforme o texto de volta em objeto.",
    objective: "Converta string 's' para objeto.",
    initialCode: "let s='{\"hp\":100}';\nlet o=___;",
    hint: "JSON.parse(s)",
    solutionRegex: /JSON\.parse\s*\(\s*s\s*\)/,
    expectedOutput: "Mensagem lida",
    xpReward: 80,
  },

  // --- EVENTOS ---
  {
    id: 28,
    category: "Eventos",
    difficulty: "Fácil",
    title: "O Gatilho",
    story: "Prepare uma armadilha que ativa ao clicar.",
    objective: "Adicione 'click' no btn.",
    initialCode: "btn.addEventListener(___, fn);",
    hint: "'click'",
    solutionRegex: /['"`]click['"`]/,
    expectedOutput: "Armadilha armada",
    xpReward: 30,
  },
  {
    id: 29,
    category: "Eventos",
    difficulty: "Médio",
    title: "Percepção",
    story: "Detecte quando o inimigo faz um movimento (input).",
    objective: "Adicione 'input' no campo.",
    initialCode: "input.addEventListener(___, fn);",
    hint: "'input'",
    solutionRegex: /['"`]input['"`]/,
    expectedOutput: "Movimento detectado",
    xpReward: 50,
  },
  {
    id: 30,
    category: "Eventos",
    difficulty: "Difícil",
    title: "Escudo Mágico",
    story: "Impeça o ataque padrão do inimigo (submit).",
    objective: "Previna o envio do form.",
    initialCode: "form.onsubmit = (e) => {\n ___\n};",
    hint: "e.preventDefault();",
    solutionRegex: /e\.preventDefault\s*\(\s*\)/,
    expectedOutput: "Ataque bloqueado",
    xpReward: 80,
  },

  // --- TEMPO ---
  {
    id: 31,
    category: "Tempo",
    difficulty: "Fácil",
    title: "Tempo de Recarga",
    story: "Sua magia precisa de 1 segundo para carregar.",
    objective: "Espere 1000ms.",
    initialCode: "setTimeout(fn, ___);",
    hint: "1000",
    solutionRegex: /1000/,
    expectedOutput: "Cooldown: 1s",
    xpReward: 30,
  },
  {
    id: 32,
    category: "Tempo",
    difficulty: "Médio",
    title: "Regeneração",
    story: "Sua vida regenera a cada 2 segundos.",
    objective: "Repita a cada 2000ms.",
    initialCode: "setInterval(fn, ___);",
    hint: "2000",
    solutionRegex: /2000/,
    expectedOutput: "Regen: +HP",
    xpReward: 50,
  },
  {
    id: 33,
    category: "Tempo",
    difficulty: "Difícil",
    title: "Parar o Tempo",
    story: "O feitiço de tempo deve ser cancelado.",
    objective: "Pare o 'timer'.",
    initialCode: "let timer = setInterval(fn, 1000);\n___(timer);",
    hint: "clearInterval",
    solutionRegex: /clearInterval\s*\(\s*timer\s*\)/,
    expectedOutput: "Tempo parado",
    xpReward: 80,
  },

  // --- DATAS ---
  {
    id: 34,
    category: "Datas",
    difficulty: "Fácil",
    title: "O Calendário",
    story: "Consulte os astros para saber a data atual.",
    objective: "Crie uma nova data.",
    initialCode: "let d = ___;",
    hint: "new Date()",
    solutionRegex: /new\s+Date\s*\(\s*\)/,
    expectedOutput: "Astros alinhados",
    xpReward: 30,
  },
  {
    id: 35,
    category: "Datas",
    difficulty: "Médio",
    title: "Ano do Dragão",
    story: "Descubra em que ano estamos.",
    objective: "Pegue o ano da data 'd'.",
    initialCode: "let d=new Date();\nlet ano=___;",
    hint: "d.getFullYear()",
    solutionRegex: /d\.getFullYear\s*\(\s*\)/,
    expectedOutput: "Ano identificado",
    xpReward: 50,
  },
  {
    id: 36,
    category: "Datas",
    difficulty: "Difícil",
    title: "Cronometrista",
    objective: "Pegue o tempo em ms.",
    initialCode: "let d=new Date();\nlet ms=___;",
    hint: "d.getTime()",
    solutionRegex: /d\.getTime\s*\(\s*\)/,
    expectedOutput: "Timestamp",
    xpReward: 80,
  },

  // --- CLASSES ---
  {
    id: 37,
    category: "Classes",
    difficulty: "Fácil",
    title: "Bestiário",
    story: "Defina o que é um monstro 'Orc'.",
    objective: "Crie classe 'Orc'.",
    initialCode: "// class Orc\n",
    hint: "class Orc {}",
    solutionRegex: /class\s+Orc/,
    expectedOutput: "Orc registrado",
    xpReward: 30,
  },
  {
    id: 38,
    category: "Classes",
    difficulty: "Médio",
    title: "Invocação",
    story: "Quando um monstro nasce, ele precisa ser construído.",
    objective: "Adicione constructor.",
    initialCode: "class Orc {\n constructor() {}\n}",
    hint: "constructor() {}",
    solutionRegex: /constructor\s*\(\s*\)/,
    expectedOutput: "Monstro invocado",
    xpReward: 50,
  },
  {
    id: 39,
    category: "Classes",
    difficulty: "Difícil",
    title: "Evolução",
    story: "Um Boss é um Orc mais forte (herança).",
    objective: "Crie 'Boss' estendendo 'Orc'.",
    initialCode: "// class Boss ...\n",
    hint: "class Boss extends Orc {}",
    solutionRegex: /class\s+Boss\s+extends\s+Orc/,
    expectedOutput: "Evolução completa",
    xpReward: 80,
  },

  // --- ES6+ ---
  {
    id: 40,
    category: "Moderno",
    difficulty: "Fácil",
    title: "Flecha Mágica",
    story: "Use uma Arrow Function para um ataque rápido.",
    objective: "Arrow function 'atacar'.",
    initialCode: "const atacar = () => 'Pow';",
    hint: "() =>",
    solutionRegex: /=>/,
    expectedOutput: "Disparo rápido",
    xpReward: 30,
  },
  {
    id: 41,
    category: "Moderno",
    difficulty: "Médio",
    title: "Saqueando o Baú",
    story: "Pegue apenas o ouro de dentro do baú (Destructuring).",
    objective: "Extraia 'id' de 'obj'.",
    initialCode: "let obj={id:1};\nlet {id} = obj;",
    hint: "{id}",
    solutionRegex: /\{\s*id\s*\}\s*=\s*obj/,
    expectedOutput: "Item pego",
    xpReward: 50,
  },
  {
    id: 42,
    category: "Moderno",
    difficulty: "Difícil",
    title: "Encantamento",
    story: "Use crases para inserir magia no texto.",
    objective: "Use crases ` `.",
    initialCode: "let txt = `Oi`;",
    hint: "`Oi`",
    solutionRegex: /`.*`/,
    expectedOutput: "Encantamento feito",
    xpReward: 80,
  },

  // --- ARRAY AVANÇADO ---
  {
    id: 43,
    category: "Funcional",
    difficulty: "Fácil",
    title: "Buff em Área",
    story: "Aplique um efeito em todos os aliados (Map).",
    objective: "Dobre: n * 2.",
    initialCode: "dano.map(n => ___);",
    hint: "n * 2",
    solutionRegex: /n\s*\*\s*2/,
    expectedOutput: "Buff aplicado",
    xpReward: 30,
  },
  {
    id: 44,
    category: "Funcional",
    difficulty: "Médio",
    title: "Detectar Fraquezas",
    story: "Filtre apenas os inimigos com vida baixa.",
    objective: "Filtre: n > 10.",
    initialCode: "dano.filter(n => ___);",
    hint: "n > 10",
    solutionRegex: /n\s*>\s*10/,
    expectedOutput: "Alvos marcados",
    xpReward: 50,
  },
  {
    id: 45,
    category: "Funcional",
    difficulty: "Difícil",
    title: "Poder Combinado",
    story: "Junte a força de todos em um ataque final (Reduce).",
    objective: "Some tudo.",
    initialCode: "arr.reduce((acc, n) => acc + n, 0);",
    hint: "acc + n",
    solutionRegex: /acc\s*\+\s*n/,
    expectedOutput: "ULTIMATE!",
    xpReward: 80,
  },

  // --- ASYNC ---
  {
    id: 46,
    category: "Async",
    difficulty: "Fácil",
    title: "A Promessa",
    story: "O rei prometeu uma recompensa futura.",
    objective: "Use .then().",
    initialCode: "missao().then(res => {});",
    hint: ".then",
    solutionRegex: /\.then/,
    expectedOutput: "Promessa aceita",
    xpReward: 30,
  },
  {
    id: 47,
    category: "Async",
    difficulty: "Médio",
    title: "Aguardando Reforços",
    story: "Espere os reforços chegarem antes de atacar (Await).",
    objective: "Função async.",
    initialCode: "async function start() {\n await load();\n}",
    hint: "async / await",
    solutionRegex: /async.*await/s,
    expectedOutput: "Reforços chegaram",
    xpReward: 50,
  },
  {
    id: 48,
    category: "Async",
    difficulty: "Difícil",
    title: "Escudo Divino",
    story: "Se algo der errado, o escudo te protege (Try/Catch).",
    objective: "Trate erro.",
    initialCode: "try {\n await boss();\n} catch { }",
    hint: "try / catch",
    solutionRegex: /try.*catch/s,
    expectedOutput: "Dano evitado",
    xpReward: 80,
  },

  // --- FINAL ---
  {
    id: 49,
    category: "Mestre",
    difficulty: "Lendário",
    title: "A Lenda Viva",
    story: "Você dominou todos os elementos. Agora é hora de ascender.",
    objective: "Async function busca dados.",
    initialCode: "async function lenda() {\n await fim();\n return true;\n}",
    hint: "async/await",
    solutionRegex: /async.*await/s,
    expectedOutput: "VOCÊ É UMA LENDA!",
    xpReward: 5000,
  },
];

// --- HELPER FUNCTION (FORA DO COMPONENTE PARA EVITAR DUPLICAÇÃO) ---
const getDifficultyColor = (diff) => {
  if (diff === "Fácil") return "text-green-400";
  if (diff === "Médio") return "text-yellow-400";
  return "text-red-400";
};

export default function App() {
  // Inicialização Otimizada (Lê storage apenas uma vez no início)
  const [initialData] = useState(() => {
    const data = safeStorage.get("jsQuestSafeV1");
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      console.warn("Dados iniciais corrompidos");
      return null;
    }
  });

  const [gameState, setGameState] = useState("menu");

  const [currentLevelIndex, setCurrentLevelIndex] = useState(() => {
    if (
      initialData &&
      typeof initialData.level === "number" &&
      initialData.level >= 0 &&
      initialData.level < LEVELS.length
    ) {
      return initialData.level;
    }
    return 0;
  });

  const [userCode, setUserCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);

  const [xp, setXp] = useState(() => initialData?.xp || 0);
  const [hearts, setHearts] = useState(() => initialData?.hearts || 10);

  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");

  // Safeguard: Garante que o nível sempre existe
  const currentLevel = LEVELS[currentLevelIndex] || LEVELS[0];

  // --- FUNÇÃO DE SALVAR ---
  const saveProgress = (newLevel, newXp, newHearts) => {
    setSaveStatus("saving");
    try {
      const dataToSave = {
        level: newLevel,
        xp: newXp,
        hearts: newHearts,
        lastPlayed: new Date().toISOString(),
      };
      localStorage.setItem("jsQuestSafeV1", JSON.stringify(dataToSave));
      setSaveStatus("saved");
    } catch (e) {
      console.error("Erro no save:", e);
      setSaveStatus("idle");
    }
    setTimeout(() => setSaveStatus("idle"), 1000);
  };

  const continueGame = () => {
    setGameState("playing");
    resetLevel(currentLevelIndex);
  };

  const startNewGame = () => {
    setGameState("playing");
    setCurrentLevelIndex(0);
    setXp(0);
    setHearts(10);
    resetLevel(0);
    saveProgress(0, 0, 10);
  };

  const resetLevel = (index) => {
    if (LEVELS[index]) {
      setUserCode(LEVELS[index].initialCode);
      setConsoleOutput([]);
      setFeedback(null);
      setShowHint(false);
    }
  };

  const checkCode = () => {
    try {
      const isCorrect = currentLevel.solutionRegex.test(userCode);
      let simulatedOutput = [];
      if (userCode.includes("console.log")) {
        const match = userCode.match(/console\.log\((.*?)\)/);
        if (match) simulatedOutput.push(`> ${match[1].replace(/['"]/g, "")}`);
      }

      if (isCorrect) {
        setFeedback({ type: "success", message: "SUCESSO!" });
        setConsoleOutput([
          ...simulatedOutput,
          "SISTEMA: " + currentLevel.expectedOutput,
        ]);
        const newXp = xp + currentLevel.xpReward;
        setXp(newXp);
        saveProgress(currentLevelIndex, newXp, hearts);

        setTimeout(() => {
          if (currentLevelIndex < LEVELS.length - 1) {
            setCurrentLevelIndex((prev) => {
              const next = prev + 1;
              resetLevel(next);
              saveProgress(next, newXp, hearts);
              return next;
            });
          } else {
            setGameState("won");
          }
        }, 1500);
      } else {
        setFeedback({ type: "error", message: "Erro de Sintaxe" });
        setConsoleOutput([...simulatedOutput, "> Error: Unexpected token..."]);
        setHearts((prev) => {
          const newHearts = prev - 1;
          if (newHearts <= 0) setGameState("gameover");
          saveProgress(currentLevelIndex, xp, newHearts);
          return newHearts;
        });
      }
    } catch {
      setFeedback({ type: "error", message: "Erro Fatal no Código" });
    }
  };

  if (gameState === "menu") {
    return (
      <div className='min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10 pointer-events-none'>
          <div className='absolute top-10 left-10 text-9xl text-yellow-500 font-mono'>{`{}`}</div>
          <div className='absolute bottom-20 right-20 text-9xl text-blue-500 font-mono'>{`</>`}</div>
        </div>
        <div className='z-10 text-center max-w-2xl'>
          <div className='mb-6 flex justify-center'>
            <div className='bg-[#bd93f9] p-4 rounded-xl shadow-2xl'>
              <Code size={64} className='text-[#282a36]' />
            </div>
          </div>
          <h1 className='text-5xl font-bold mb-2 tracking-tight'>JS QUEST</h1>
          <p className='text-xl text-purple-300 mb-8 font-mono'>
            Do Zero ao Fullstack
          </p>
          <div className='grid grid-cols-2 gap-4 mb-8 text-left max-w-md mx-auto'>
            <div className='bg-slate-800 p-3 rounded border border-slate-700'>
              <span className='block text-slate-400 text-xs uppercase'>
                Nível
              </span>
              <span className='text-white font-bold text-xl'>
                {currentLevelIndex + 1} / {LEVELS.length}
              </span>
            </div>
            <div className='bg-slate-800 p-3 rounded border border-slate-700'>
              <span className='block text-slate-400 text-xs uppercase'>XP</span>
              <span className='text-white font-bold text-xl'>{xp}</span>
            </div>
          </div>
          <div className='flex flex-col gap-3 w-full max-w-xs mx-auto'>
            <button
              onClick={continueGame}
              className='w-full py-4 text-lg font-bold text-[#282a36] bg-[#50fa7b] rounded-lg hover:bg-[#43d969] shadow-lg flex items-center justify-center gap-2'
            >
              <Play size={20} />{" "}
              {currentLevelIndex > 0 ? "Continuar" : "Iniciar"}
            </button>
            {currentLevelIndex > 0 && (
              <button
                onClick={startNewGame}
                className='w-full py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded'
              >
                Reiniciar Progresso
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "won") {
    return (
      <div className='min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center'>
        <Trophy size={80} className='text-[#f1fa8c] mb-6 animate-bounce' />
        <h1 className='text-4xl font-bold mb-4 text-[#50fa7b]'>Parabéns!</h1>
        <p className='text-xl mb-6'>Curso Concluído.</p>
        <button
          onClick={() => setGameState("menu")}
          className='px-6 py-3 bg-[#bd93f9] text-[#282a36] font-bold hover:bg-[#ff79c6] rounded-lg'
        >
          Menu
        </button>
      </div>
    );
  }

  if (gameState === "gameover") {
    return (
      <div className='min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center'>
        <Bug size={80} className='text-[#ff5555] mb-6' />
        <h1 className='text-4xl font-bold mb-4 text-[#ff5555]'>Game Over</h1>
        <button
          onClick={() => {
            setHearts(10);
            saveProgress(currentLevelIndex, xp, 10);
            setGameState("playing");
          }}
          className='px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg'
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div
      id='app-container'
      className='min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col md:flex-row overflow-hidden'
    >
      {/* Sidebar */}
      <div className='w-full md:w-80 bg-slate-800 border-r border-slate-700 flex flex-col shadow-xl z-20'>
        <div className='p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center'>
          <h2 className='text-[#bd93f9] font-bold text-lg flex items-center gap-2'>
            <Zap size={18} /> JS Quest
          </h2>
          {saveStatus === "saving" && (
            <RefreshCw size={14} className='animate-spin text-slate-500' />
          )}
          {saveStatus === "saved" && (
            <CheckCircle size={14} className='text-green-500' />
          )}
        </div>
        <div className='p-4 grid grid-cols-2 gap-2 border-b border-slate-700'>
          <div className='bg-slate-900 p-2 rounded'>
            <div className='text-[10px] uppercase text-slate-500 font-bold'>
              Vidas
            </div>
            <div className='flex text-[#ff5555]'>
              {hearts} <Heart size={14} className='ml-1 fill-[#ff5555]' />
            </div>
          </div>
          <div className='bg-slate-900 p-2 rounded'>
            <div className='text-[10px] uppercase text-slate-500 font-bold'>
              XP
            </div>
            <div className='text-[#f1fa8c] font-mono'>{xp}</div>
          </div>
        </div>
        <div className='flex-1 overflow-y-auto p-2 space-y-1'>
          {LEVELS.map((level, idx) => (
            <div
              key={level.id}
              className={`p-3 rounded-lg text-sm border transition-all ${idx === currentLevelIndex ? "bg-purple-900/40 border-purple-500/50 text-white" : idx < currentLevelIndex ? "bg-slate-800 border-transparent text-[#50fa7b] opacity-50" : "bg-slate-800 border-transparent text-slate-600"}`}
            >
              <div className='flex justify-between items-center mb-1'>
                <span className='text-[10px] font-bold uppercase tracking-wider opacity-70'>
                  {level.category}
                </span>
                {idx > currentLevelIndex && <Lock size={12} />}
                {idx < currentLevelIndex && <CheckCircle size={12} />}
              </div>
              <div className='font-semibold truncate mb-1'>
                {idx + 1}. {level.title}
              </div>
              <div
                className={`text-[10px] flex items-center gap-1 ${getDifficultyColor(level.difficulty)}`}
              >
                <Zap size={10} /> {level.difficulty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className='flex-1 flex flex-col h-screen overflow-hidden'>
        <div className='bg-slate-800 p-6 border-b border-slate-700 shadow-sm shrink-0'>
          <div className='flex items-center gap-3 mb-3'>
            <span
              className={`text-[#282a36] text-xs font-bold px-2 py-1 rounded ${getDifficultyColor(currentLevel.difficulty).replace("text", "bg").replace("400", "400")}`}
            >
              {currentLevel.difficulty}
            </span>
            <h1 className='text-2xl font-bold text-white'>
              {currentLevel.title}
            </h1>
          </div>
          <div className='text-slate-300 border-l-4 border-[#ff79c6] pl-4 py-2 mb-4 bg-slate-700/30 rounded-r text-sm md:text-base leading-relaxed'>
            {currentLevel.story}
          </div>
          <div className='bg-[#282a36] border border-slate-600 p-4 rounded text-blue-200 text-sm md:text-base flex gap-3 shadow-inner'>
            <BookOpen size={20} className='shrink-0 mt-1 text-[#8be9fd]' />
            <div>
              <strong className='block mb-1 text-[#8be9fd] text-xs uppercase tracking-wide'>
                Objetivo
              </strong>
              <span className='text-[#f8f8f2]'>{currentLevel.objective}</span>
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-900 p-4 gap-4'>
          <div className='flex-1 flex flex-col min-h-[300px] md:min-h-0 bg-[#282a36] rounded-lg border border-slate-700 shadow-lg overflow-hidden'>
            <div className='bg-[#21222c] px-4 py-2 flex items-center justify-between border-b border-[#44475a]'>
              <div className='flex items-center gap-2 text-[#f8f8f2] text-sm font-mono'>
                <Code size={16} className='text-[#ff79c6]' />
                <span>code.js</span>
              </div>
              <button
                onClick={() => setShowHint(!showHint)}
                className='text-xs text-[#8be9fd] hover:text-[#f1fa8c] hover:underline'
              >
                {showHint ? "Esconder Dica" : "Ver Dica"}
              </button>
            </div>
            {showHint && (
              <div className='bg-[#44475a] text-[#f1fa8c] text-xs p-2 border-b border-[#6272a4] font-mono'>
                // Dica: {currentLevel.hint}
              </div>
            )}
            <DraculaEditor
              code={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />
            <div className='p-3 bg-[#21222c] border-t border-[#44475a] flex justify-end'>
              <button
                onClick={checkCode}
                className='bg-[#50fa7b] hover:bg-[#43d969] text-[#282a36] px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg'
              >
                <Play size={18} /> Executar
              </button>
            </div>
          </div>

          <div className='md:w-1/3 flex flex-col bg-black rounded-lg border border-slate-800 shadow-lg overflow-hidden font-mono text-sm'>
            <div className='bg-slate-900 px-4 py-2 border-b border-slate-800 text-slate-400 text-sm flex items-center gap-2'>
              <Terminal size={16} />
              <span>Console</span>
            </div>
            <div className='flex-1 p-4 overflow-y-auto space-y-2'>
              {consoleOutput.length === 0 && (
                <span className='text-slate-600 italic opacity-50'>
                  Aguardando...
                </span>
              )}
              {consoleOutput.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("> Error")
                      ? "text-[#ff5555]"
                      : "text-[#f8f8f2]"
                  }
                >
                  {line}
                </div>
              ))}
              {feedback && (
                <div
                  className={`mt-4 p-3 rounded border ${feedback.type === "success" ? "bg-[#50fa7b]/10 border-[#50fa7b]/50 text-[#50fa7b]" : "bg-[#ff5555]/10 border-[#ff5555]/50 text-[#ff5555]"}`}
                >
                  {feedback.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
      `}</style>
    </div>
  );
}
