import dns.resolver

def get_mongo_string(domain):
    print(f"Resolving for {domain}...")
    try:
        # Resolve SRV record
        srv_records = dns.resolver.resolve(f'_mongodb._tcp.{domain}', 'SRV')
        hosts = []
        for r in srv_records:
            hosts.append(f"{str(r.target).rstrip('.')}:{r.port}")
        
        # Resolve TXT record for options
        txt_records = dns.resolver.resolve(domain, 'TXT')
        options = []
        for r in txt_records:
            options.append(str(r).strip('"'))
        
        print("\n--- Standard Connection String Template ---")
        hosts_str = ",".join(hosts)
        options_str = "&".join(options)
        print(f"mongodb://zyka:Nishmal786@{hosts_str}/test?{options_str}&ssl=true&authSource=admin")
        
    except Exception as e:
        print(f"Error: {e}")

get_mongo_string("zyka.rasewku.mongodb.net")
