import React from 'react';
import { Settings, Code } from 'lucide-react';

const Setup = () => {
  return (
    <div className="flex flex-col gap-6" id="setup">
      <div>
        <p className="text-sm text-muted-foreground mb-1">Development</p>
        <h2 className="text-2xl sm:text-3xl font-semibold">Setup</h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Gears Used */}
        <div className="flex items-center gap-4 p-4 rounded-xl border border-border dark:border-white/5 bg-card dark:bg-white/5 hover:bg-secondary dark:hover:bg-white/10 transition-colors">
          <div className="p-2.5 bg-secondary dark:bg-white/5 rounded-lg border border-border dark:border-white/10">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium text-sm sm:text-base">Gears Used</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Productivity Tools, Gears i use to get my work done.</p>
          </div>
        </div>

        {/* VS Code Setup */}
        <div className="flex items-center gap-4 p-4 rounded-xl border border-border dark:border-white/5 bg-card dark:bg-white/5 hover:bg-secondary dark:hover:bg-white/10 transition-colors">
          <div className="p-2.5 bg-secondary dark:bg-white/5 rounded-lg border border-border dark:border-white/10">
            <Code className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium text-sm sm:text-base">VS Code / Cursor Setup</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">VS Code / Cursor Setup i use daily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
