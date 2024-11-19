import fs from 'fs';
import path from 'path';

class Logger {
  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.errorSummary = [];
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  getLogFilePath() {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `${date}.log`);
  }

  getSummaryFilePath() {
    return path.join(this.logDir, 'error-summary.log');
  }

  formatLogEntry(level, message, error = null) {
    const timestamp = new Date().toISOString();
    let entry = `[${timestamp}] ${level}: ${message}`;
    
    if (error) {
      entry += `\nStack: ${error.stack}\n`;
      if (error.response) {
        entry += `Response: ${JSON.stringify(error.response.data)}\n`;
      }
    }
    
    return entry;
  }

  log(level, message, error = null) {
    const logEntry = this.formatLogEntry(level, message, error);

    // Écrire dans le fichier de log quotidien
    try {
      fs.appendFileSync(this.getLogFilePath(), logEntry + '\n');
    } catch (e) {
      console.error('Erreur écriture log:', e);
    }

    // Si c'est une erreur, l'ajouter au résumé
    if (level === 'ERROR') {
      this.errorSummary.push({
        timestamp: new Date().toISOString(),
        message,
        error: error?.stack,
        response: error?.response?.data
      });
      this.updateErrorSummary();
    }

    // Afficher dans la console en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(logEntry);
    }
  }

  info(message) {
    this.log('INFO', message);
  }

  error(message, error = null) {
    this.log('ERROR', message, error);
  }

  warn(message) {
    this.log('WARN', message);
  }

  updateErrorSummary() {
    try {
      const summary = this.errorSummary
        .map(({ timestamp, message, error, response }) => {
          let entry = `[${timestamp}] ${message}`;
          if (error) entry += `\nStack: ${error}`;
          if (response) entry += `\nResponse: ${JSON.stringify(response)}`;
          return entry + '\n';
        })
        .join('\n');

      fs.writeFileSync(
        this.getSummaryFilePath(),
        '=== RÉSUMÉ DES ERREURS ===\n\n' + summary
      );
    } catch (e) {
      console.error('Erreur mise à jour résumé:', e);
    }
  }

  clearLogs() {
    try {
      const files = fs.readdirSync(this.logDir);
      files.forEach(file => {
        if (file.endsWith('.log')) {
          fs.unlinkSync(path.join(this.logDir, file));
        }
      });
      this.errorSummary = [];
      this.updateErrorSummary();
    } catch (e) {
      console.error('Erreur nettoyage logs:', e);
    }
  }
}

export const logger = new Logger();