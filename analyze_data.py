import pandas as pd
import json

df = pd.read_excel(r'c:\Users\pc\Desktop\yearEndsummary\云招商_20260109.xlsx')
df.columns = ['日期', '每日注册', '每日转发', '每日登录']

print('=== 数据概览 ===')
print(f'数据时间范围: {df["日期"].min()} 至 {df["日期"].max()}')
print(f'总天数: {len(df)}')

print('\n=== 累计统计 (人数) ===')
total_register = int(df['每日注册'].sum())
total_forward = int(df['每日转发'].sum())
total_login = int(df['每日登录'].sum())
print(f'累计注册人数: {total_register}')
print(f'累计转发人数: {total_forward}')
print(f'累计登录人数: {total_login}')

print('\n=== 日均统计 (人数) ===')
print(f'日均注册: {df["每日注册"].mean():.1f}')
print(f'日均转发: {df["每日转发"].mean():.1f}')
print(f'日均登录: {df["每日登录"].mean():.1f}')

print('\n=== 月度汇总 ===')
df['月份'] = pd.to_datetime(df['日期']).dt.to_period('M')
monthly = df.groupby('月份').agg({'每日注册':'sum', '每日转发':'sum', '每日登录':'sum'}).reset_index()
monthly['月份'] = monthly['月份'].astype(str)

monthly_data = []
for _, row in monthly.iterrows():
    print(f'{row["月份"]}: 注册{int(row["每日注册"])}人, 转发{int(row["每日转发"])}人, 登录{int(row["每日登录"])}人')
    monthly_data.append({
        'month': row['月份'],
        'register': int(row['每日注册']),
        'forward': int(row['每日转发']),
        'login': int(row['每日登录'])
    })

# Export data as JSON for the React app
export_data = {
    'summary': {
        'totalDays': len(df),
        'dateRange': f'{df["日期"].min().strftime("%Y-%m-%d")} 至 {df["日期"].max().strftime("%Y-%m-%d")}',
        'totalRegister': total_register,
        'totalForward': total_forward,
        'totalLogin': total_login,
        'avgRegister': round(df['每日注册'].mean(), 1),
        'avgForward': round(df['每日转发'].mean(), 1),
        'avgLogin': round(df['每日登录'].mean(), 1)
    },
    'monthly': monthly_data
}

print('\n=== JSON Data for React ===')
print(json.dumps(export_data, ensure_ascii=False, indent=2))
