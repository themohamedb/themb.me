(function(){try{var H=window.Hiddo,h=React.createElement;
var lx=document.getElementById('lex-demo'); if(lx) ReactDOM.createRoot(lx).render(h('div',{className:'lex-phone'},
 h(H.TopBar,{title:'Bogga hore',menu:{groups:[{label:'Adeegyada',items:[{icon:'send',label:'Lacag dir'},{icon:'mobile-wallet',label:'Kaar ku shubasho'}]},{label:'Akoonka',items:[{icon:'settings',label:'Habaynta'},{icon:'globe',label:'Luqadda',description:'Soomaali'},{icon:'info',label:'Caawimaad'}]}]},actions:[{icon:'search',label:'Raadi'},{icon:'bell',label:'Ogeysiis',badge:true}]}),
 h('div',{className:'lex-body'},h(H.Tray,null,h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}},h('div',null,h('div',{className:'hd-hint'},'Haraaga'),h(H.Amount,{value:1250,size:'lg'})),h(H.Button,{size:'sm'},'Lacag dir'))),
  h('div',{style:{display:'flex',gap:8,flexWrap:'wrap',marginTop:16}},h(H.Button,{variant:'secondary',size:'sm'},'Soo gal'),h(H.Button,{variant:'secondary',size:'sm'},'Samee akoon'),h(H.Button,{variant:'quiet',size:'sm'},'Ka bood'))),
 h(H.BottomNav,null)));
ReactDOM.createRoot(document.getElementById('craft-carved')).render(h('div',{className:'hd-stack'},
 h(H.Input,{label:'Lacagta',numeric:true,prefix:'$',addon:'USD',defaultValue:'25.00',hint:'Khidmadda: Bilaash'}),
 h(H.OTPInput,{label:'Koodhka xaqiijinta',defaultValue:'4827'})));
ReactDOM.createRoot(document.getElementById('craft-raised')).render(h('div',{className:'hd-stack'},
 h(H.SegmentedControl,{label:'Muddada',options:[{value:'d',label:'Maalin'},{value:'w',label:'Toddobaad'},{value:'m',label:'Bil'}],defaultValue:'w'}),
 h(H.Switch,{label:'Ogeysiisyada lacagta',description:'Marka lacag laguu soo diro',defaultChecked:true}),
 h('div',{style:{display:'flex',gap:12,flexWrap:'wrap'}},h(H.Button,null,'Dir $25.00'),h(H.Button,{variant:'secondary'},'Kaydi'))));
}catch(e){console.error('craft',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Amount')).render(
    h('div', null,
      h('div', { className: 'hd-row' }, h(H.Amount, { value: 1250, size: 'lg' })),
      h('div', { className: 'hd-row' },
        h(H.Amount, { value: 25, size: 'md' }),
        h(H.Amount, { value: 0.5, size: 'md' }),
        h(H.Amount, { value: 571000, currency: 'SOS', size: 'md' }))));
}catch(e){console.error('Amount',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Badge')).render(
    h('div', { className: 'hd-row' },
      h(H.Badge, null, 'Qabyo'),
      h(H.Badge, { tone: 'success' }, 'La bixiyay'),
      h(H.Badge, { tone: 'warning' }, 'La sugayo'),
      h(H.Badge, { tone: 'error' }, 'Fashilmay'),
      h(H.Badge, { tone: 'info' }, 'Cusub')));
}catch(e){console.error('Badge',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Banner')).render(
    h('div', { className: 'hd-stack' },
      h(H.Banner, { tone: 'warning', title: 'Khadka internetku waa daciif' }, 'Sawirrada waa la hakiyay. Qoraalka ayaa marka hore soo baxaya.'),
      h(H.Banner, { tone: 'success', title: 'Waa la kaydiyay' }),
      h(H.Banner, { tone: 'error', title: 'Lacagta lama dirin' }, 'Wax lacag ah lagaama jarin. Isku day mar kale.'),
      h(H.Banner, { tone: 'info', title: 'Waxaa la cusbooneysiiyay 2 saacadood ka hor' }, 'Xogtani ma aha mid toos ah.')));
}catch(e){console.error('Banner',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-BottomNav')).render(
    h(H.BottomNav, { items: [
      { key: 'home', label: 'Bogga hore', icon: 'home' },
      { key: 'history', label: 'Taariikhda', icon: 'history', badge: 2 },
      { key: 'pay', label: 'Bixi', icon: 'qr' },
      { key: 'account', label: 'Akoonka', icon: 'user' }] }));
}catch(e){console.error('BottomNav',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Button')).render(
    h('div', null,
      h('div', { className: 'hd-row' },
        h(H.Button, null, 'Dir lacagta'),
        h(H.Button, { variant: 'secondary' }, 'Kaydi qabyo ahaan'),
        h(H.Button, { variant: 'quiet' }, 'Ka noqo'),
        h(H.Button, { variant: 'danger' }, 'Tirtir akoonka')),
      h('div', { className: 'hd-row' },
        h(H.Button, { loading: true, loadingLabel: 'Waa la dirayaa…' }, 'Dir lacagta'),
        h(H.Button, { disabled: true }, 'Dir lacagta'))));
}catch(e){console.error('Button',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Checkbox')).render(
    h('div', { className: 'hd-stack' },
      h(H.Checkbox, { label: 'Kaydi qofkan', description: 'Mar dambe si dhakhso ah ugu dir.', defaultChecked: true }),
      h(H.Checkbox, { label: 'Waan aqbalay shuruudaha' })));
}catch(e){console.error('Checkbox',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Chips')).render(
    h('div', { className: 'hd-row' },
      h(H.Chips, { label: 'Kala sooc', options: [{ value: 'all', label: 'Dhammaan', count: 24 }, { value: 'sent', label: 'La diray', icon: 'send' }, { value: 'in', label: 'La helay', icon: 'receive' }, { value: 'p', label: 'La sugayo', icon: 'clock' }] })));
}catch(e){console.error('Chips',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-DatePicker')).render(h(H.DatePicker, null));
}catch(e){console.error('DatePicker',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Dialog')).render(
    h(H.Dialog, { open: true, inline: true, tone: 'danger', title: 'Ma doonaysaa inaad tirtirto akoonkaaga?', body: 'Xogtaada oo dhan waa la tirtiri doonaa. Tallaabadan lama celin karo.', confirmLabel: 'Tirtir akoonka', cancelLabel: 'Ka noqo' }));
}catch(e){console.error('Dialog',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Field')).render(
    h('div', { className: 'hd-stack' },
      h(H.Field, { label: 'Magaalada', sublabel: 'City', defaultValue: 'Muqdisho', hint: 'Magaalada aad hadda ku nooshahay.' }),
      h(H.Field, { label: 'Email', type: 'email', inputMode: 'email', defaultValue: 'amina@', error: 'Ku qor email sax ah, tusaale: amina@mail.so' })));
}catch(e){console.error('Field',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Input')).render(
    h('div', { className: 'hd-stack' },
      h(H.Input, { icon: 'search', placeholder: 'Raadi magac ama lambar', 'aria-label': 'Raadi' }),
      h(H.Input, { label: 'Lacagta', numeric: true, prefix: '$', addon: 'USD', defaultValue: '25.00' }),
      h(H.Input, { label: 'Lambarka telefoonka', icon: 'phone', prefix: '+252', defaultValue: '61 000', error: 'Lambarku waa inuu ka kooban yahay 9 tiro.' })));
}catch(e){console.error('Input',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-LanguageSwitch')).render(
    h('div', { className: 'hd-row' }, h(H.LanguageSwitch, null)));
}catch(e){console.error('LanguageSwitch',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-ListRow')).render(
    h('div', null,
      h(H.ListRow, { title: 'Amina Yusuf Ibrahim', subtitle: 'La diray · EVC Plus', amount: -25, meta: 'Maanta 10:24', onClick: function () {} }),
      h(H.ListRow, { title: 'Cabdi Xasan Faarax', subtitle: 'La helay · Zaad', amount: 120, meta: 'Shalay', onClick: function () {} }),
      h(H.ListRow, { title: 'Hormuud Telecom', subtitle: 'Kaar ku shubasho', amount: -5, meta: 'Isniin', badge: h(H.Badge, { tone: 'warning' }, 'La sugayo'), onClick: function () {} })));
}catch(e){console.error('ListRow',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Menu')).render(
    h(H.Menu, { groups: [
      { label: 'Adeegyada', items: [
        { icon: 'send', label: 'Lacag dir' },
        { icon: 'mobile-wallet', label: 'Kaar ku shubasho' },
        { icon: 'download', label: 'Dajinta', badge: 3 }] },
      { label: 'Akoonka', items: [
        { icon: 'user', label: 'Akoonka', description: 'Amina Yusuf Ibrahim' },
        { icon: 'settings', label: 'Habaynta' },
        { icon: 'info', label: 'Caawimaad' },
        { icon: 'arrow-right', label: 'Ka bax' }] }] }));
}catch(e){console.error('Menu',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-NameField')).render(
    h('div', { className: 'hd-stack' },
      h(H.NameField, { defaultValue: { own: 'Amina', father: 'Yusuf', grandfather: 'Ibrahim', nickname: '' } })));
}catch(e){console.error('NameField',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-OTPInput')).render(
    h('div', { className: 'hd-stack' },
      h(H.OTPInput, { label: 'Koodhka xaqiijinta', hint: 'Koodhka waxaa loo diray +252 61 ••• 0000.', defaultValue: '4827',
        resendNote: '0:42', resend: h(H.Button, { variant: 'quiet', size: 'sm' }, 'Koodh cusub ii soo dir') })));
}catch(e){console.error('OTPInput',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  function Demo() {
    var s = React.useState('idle'), status = s[0], set = s[1];
    function send() {
      set('sending');
      setTimeout(function () { set('sent'); }, 1400);
    }
    return h('div', { className: 'hd-stack' },
      h(H.PayConfirm, { recipient: 'Amina Yusuf Ibrahim', phone: '+252 61 000 0000', wallet: 'EVC Plus', amount: 25, fee: 0, status: status, onConfirm: send }),
      status === 'sent' ? h(H.Button, { variant: 'quiet', onClick: function () { set('idle'); } }, 'Isku day mar kale') : null);
  }
  ReactDOM.createRoot(document.getElementById('m-PayConfirm')).render(h(Demo));
}catch(e){console.error('PayConfirm',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-PhoneField')).render(
    h('div', { className: 'hd-stack' },
      h(H.PhoneField, { defaultValue: '61 000 0000', hint: 'Lambarka EVC Plus, Zaad ama Sahal.' })));
}catch(e){console.error('PhoneField',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-QRPay')).render(
    h('div', { className: 'hd-row', style: { alignItems: 'flex-start' } },
      h(H.QRPay, { mode: 'show', payload: 'HIDDO-DEMO-NOT-A-REAL-PAYMENT-CODE', name: 'Amina Yusuf Ibrahim', phone: '+252 61 000 0000' }),
      h(H.QRPay, { mode: 'scan', onScan: function () {} })));
}catch(e){console.error('QRPay',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-RadioGroup')).render(
    h('div', { className: 'hd-stack' },
      h(H.RadioGroup, { legend: 'Sida qofku lacagta u helayo', options: [
        { value: 'mobile', label: 'Lacagaha mobilka', description: 'EVC Plus, Zaad, Sahal', icon: 'mobile-wallet' },
        { value: 'bank', label: 'Akoon bangi', description: '1–2 maalmood', icon: 'card' },
        { value: 'hawala', label: 'Xawaalad', description: 'Lacag caddaan ah', icon: 'remittance' }] })));
}catch(e){console.error('RadioGroup',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  function Demo() {
    var k = React.useState(0);
    return h('div', { className: 'hd-stack' },
      h(H.Receipt, { key: k[0], provider: 'EVC Plus', date: '17 Okt 2026 · 18:42', amount: 25, fee: 0, recipient: 'Amina Yusuf Ibrahim', wallet: 'EVC Plus', reference: 'HD7K2Q9X41' }),
      h('div', null, h(H.Button, { variant: 'secondary', size: 'sm', onClick: function () { k[1](k[0] + 1); } }, h(H.Icon, { name: 'refresh', size: 16 }), 'Mar kale daabac')));
  }
  ReactDOM.createRoot(document.getElementById('m-Receipt')).render(h(Demo));
}catch(e){console.error('Receipt',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-RopeDivider')).render(
    h('div', { className: 'hd-stack', style: { maxWidth: '560px' } },
      h(H.RopeDivider, null),
      h(H.RopeDivider, { accent: true })));
}catch(e){console.error('RopeDivider',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-SegmentedControl')).render(
    h('div', { className: 'hd-row' },
      h(H.SegmentedControl, { label: 'Muddada', options: [{ value: 'd', label: 'Maalin' }, { value: 'w', label: 'Toddobaad' }, { value: 'm', label: 'Bil' }], defaultValue: 'w' })));
}catch(e){console.error('SegmentedControl',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Select')).render(
    h('div', { className: 'hd-stack' },
      h(H.Select, { label: 'Lacagta', options: [{ value: 'USD', label: 'USD — Doolarka Maraykanka' }, { value: 'SOS', label: 'SOS — Shilinka Soomaaliga' }] })));
}catch(e){console.error('Select',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-SendMoneyForm')).render(h('div', { className: 'hd-stack' }, h(H.SendMoneyForm)));
}catch(e){console.error('SendMoneyForm',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  function pick() {}
  ReactDOM.createRoot(document.getElementById('m-Sheet')).render(
    h(H.Sheet, { inline: true, title: 'Dooro halka laga bixinayo' },
      h(H.ListRow, { title: 'EVC Plus', subtitle: '+252 61 000 0000', meta: 'Hormuud', initials: 'EV', onClick: pick }),
      h(H.ListRow, { title: 'Zaad', subtitle: '+252 63 000 0000', meta: 'Telesom', initials: 'ZA', onClick: pick }),
      h(H.ListRow, { title: 'Sahal', subtitle: '+252 90 000 0000', meta: 'Golis', initials: 'SA', onClick: pick }),
      h(H.ListRow, { title: 'e-Dahab', subtitle: '+252 62 000 0000', meta: 'Somtel', initials: 'eD', onClick: pick })));
}catch(e){console.error('Sheet',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Switch')).render(
    h('div', { className: 'hd-stack' },
      h(H.Switch, { label: 'Ogeysiisyada lacagta', description: 'Marka lacag laguu soo diro', defaultChecked: true }),
      h(H.Switch, { label: 'Fariimaha SMS', description: 'Haddii internetku maqan yahay' })));
}catch(e){console.error('Switch',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Tabs')).render(
    h(H.Tabs, { label: 'Dhaqdhaqaaqa', tabs: [
      { key: 'all', label: 'Dhammaan', count: 24 },
      { key: 'sent', label: 'La diray' },
      { key: 'in', label: 'La helay' }] }));
}catch(e){console.error('Tabs',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Textarea')).render(
    h('div', { className: 'hd-stack' },
      h(H.Textarea, { label: 'Fariin', optional: true, max: 120, rows: 3, defaultValue: 'Hooyo, kani waa kharashka bishan.' })));
}catch(e){console.error('Textarea',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  var menu = { groups: [
    { label: 'Lacagta', items: [
      { icon: 'send', label: 'Lacag dir' },
      { icon: 'mobile-wallet', label: 'Kaar ku shubasho', description: 'EVC Plus, Zaad, Sahal' },
      { icon: 'remittance', label: 'Xawaalad' }] },
    { label: 'Akoonka', items: [
      { icon: 'settings', label: 'Habaynta' },
      { icon: 'globe', label: 'Luqadda', description: 'Soomaali' },
      { icon: 'info', label: 'Caawimaad' }] }] };
  ReactDOM.createRoot(document.getElementById('m-TopBar')).render(
    h('div', { className: 'hd-stack', style: { gap: 20 } },
      h(H.TopBar, { title: 'Bogga hore', menu: menu, actions: [{ icon: 'search', label: 'Raadi' }, { icon: 'bell', label: 'Ogeysiis', badge: true }] }),
      h(H.TopBar, { leading: 'back', title: 'Taariikhda', sub: 'Oktoobar 2026', actions: [{ icon: 'filter', label: 'Kala sooc' }] }),
      h(H.TopBar, { leading: 'close', title: 'Lacag u dir', cta: h(H.Button, { size: 'sm' }, 'Sii wad') })));
}catch(e){console.error('TopBar',e);}})();
(function(){try{
  var H = window.Hiddo, h = React.createElement;
  ReactDOM.createRoot(document.getElementById('m-Tray')).render(
    h('div', { className: 'hd-stack' },
      h(H.Tray, { footer: [h('span', { key: 1 }, 'Waxaa la cusbooneysiiyay 2 daqiiqo ka hor'), h(H.Icon, { key: 2, name: 'refresh', size: 16 })] },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('div', null, h('div', { className: 'hd-hint' }, 'Haraaga'), h(H.Amount, { value: 1250, size: 'lg' })),
          h(H.Button, { variant: 'secondary', size: 'sm' }, h(H.Icon, { name: 'qr', size: 18 }), 'Bixi')))));
}catch(e){console.error('Tray',e);}})();
