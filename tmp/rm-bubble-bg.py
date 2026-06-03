
import re, shutil, os
f = os.path.expanduser('~/Bench-studio-suite/constellation/index.html')
shutil.copy(f, f + '.bak2')
txt = open(f).read()
start_marker = '  /* Gaseous nebula core'
end_marker = '  .bubble-rune-ring { display: none; }'
i = txt.find(start_marker)
j = txt.find(end_marker)
if i == -1 or j == -1:
    print('MARKER NOT FOUND', i, j)
else:
    j = j + len(end_marker)
    result = txt[:i] + '  /* legacy bubble-bg, rim, rune-ring removed */' + txt[j:]
    open(f, 'w').write(result)
    print('OK')

import re, shutil, os
f = os.path.expanduser('~/Bench-studio-suite/constellation/index.html')
shutil.copy(f, f + '.bak2')
txt = open(f).read()
start_marker = '  /* Gaseous nebula core'
end_marker = '  .bubble-rune-ring { display: none; }'
i = txt.find(start_marker)
j = txt.find(end_marker)
if i == -1 or j == -1:
    print('MARKER NOT FOUND', i, j)
else:
    j = j + len(end_marker)
    result = txt[:i] + '  /* legacy bubble-bg, rim, rune-ring removed */' + txt[j:]
    open(f, 'w').write(result)
    print('OK')
