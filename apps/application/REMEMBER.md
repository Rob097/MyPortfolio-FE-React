La differenza tra questo blocco:

```
<Box sx={{display: {md: 'block', xs: 'none'}}} >
    <p>test</p>
</Box>
```
E questo blocco:

```
<ShowIf condition={isGreaterThanMd}>
    <p>test</p>
</ShowIf>
```
è che il primo permettere di generare comunque il contenuto e renderlo quindi presente nel codice sorgente per la SEO.
Il secondo invece blocca la generazione del contenuto se la condizione non è soddisfatta. Non sarà quindi visibile nel codice sorgente.



Per connettersi alla cli di redis:
redis-cli -h ourlists.ddns.net