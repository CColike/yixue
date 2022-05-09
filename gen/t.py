import datetime

with open('d.json','w',encoding='utf-8') as fp:
  t = datetime.date.today()-datetime.timedelta(days=10)
  for i in range(2000):
    s = str(t)
    x,y,z = s.split('-')
    if y != str(int(y)):
      s = x+'-'+str(int(y))+'-'+z
    fp.write('{"_id":"' + s + '","12:30-13:00":0,"13:00-13:30":0,"13:30-14:00":0,"14:00-14:30":0,"14:30-15:00":0,"15:00-15:30":0,"15:30-16:00":0,"16:00-16:30":0,"16:30-17:00":0,"17:00-17:30":0,"17:30-18:00":0,"18:00-18:30":0,"18:30-19:00":0,"19:00-19:30":0,"19:30-20:00":0,"20:00-20:30":0}\n')
    t = t+datetime.timedelta(days=1)
#     fp.write()