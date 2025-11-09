# UHC Core (Kubernetes Manifeste)

Dieser Ordner enthält Deployments, Services und Ingress für die drei Core-Services:
`membership`, `booking`, `checkin`.

## Voraussetzungen
- `kubectl` ist auf das Ziel-AKS konfiguriert (`kubectl config current-context`)
- NGINX Ingress Controller läuft im Cluster
- `cert-manager` installiert + ClusterIssuer `letsencrypt-production`
- DNS zeigt auf den öffentlichen LoadBalancer
- TLS-Secret `uhc-core-tls` existiert (wird vom cert-manager erstellt)

## Struktur
- `namespace.yaml` – Namespace `uhc-core`
- `deployment-*.yaml` – Deployments + Services für membership/booking/checkin
- `ingress.yaml` – Ingress-Regeln inkl. TLS auf `api.urbanhealth.club`

## Deploy / Update
```bash
kubectl apply -f namespace.yaml
kubectl apply -f deployment-membership.yaml
kubectl apply -f deployment-booking.yaml
kubectl apply -f deployment-checkin.yaml
kubectl apply -f ingress.yaml
heredoc> MD
