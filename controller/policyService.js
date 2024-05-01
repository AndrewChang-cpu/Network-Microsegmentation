const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');


exports.addNetworkPolicy = (req, res) => {
    const { srcPod, destPod, ingress, egress } = req.body;

    try {

        // Construct NetworkPolicy YAML
        const networkPolicyId = uuidv4();
        const networkPolicyYAML = `
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ${networkPolicyId}
spec:
  podSelector: {} # Selects all pods in the namespace
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: ${srcPod} # Match pods with the specified name
    ports:
${constructPortsYAML(ingress)}
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: ${destPod} # Match pods with the specified name
    ports:
${constructPortsYAML(egress)}
`;

        // Apply NetworkPolicy YAML using kubectl
        exec(`kubectl apply -f - <<EOF\n${networkPolicyYAML}\nEOF`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing kubectl: ${error}`);
                res.status(500).json({ message: 'Failed to create NetworkPolicy' });
                return;
            }

            // Return the ID of the created NetworkPolicy
            res.status(200).json({ networkPolicyId });
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

function constructPortsYAML(ports) {
    return ports.map(port => `    - protocol: ${port.split('/')[1]}\n      port: ${port.split('/')[0]}`).join('\n');
}

// Function to get NetworkPolicies
exports.getNetworkPolicies = (req, res) => {

    try {
            // Execute kubectl command to get NetworkPolicies in JSON format
            exec('kubectl get networkpolicies --namespace=default -o json', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing kubectl: ${error}`);
                    res.status(500).json({ message: 'Failed to fetch NetworkPolicies' });
                    return;
                }

                try {
                    const networkPolicies = JSON.parse(stdout).items.map(policy => ({
                        name: policy.metadata.name,
                        podSelector: policy.spec.podSelector,
                        policyTypes: policy.spec.policyTypes,
                        ingress: policy.spec.ingress,
                        egress: policy.spec.egress,
                    }));

                    // Return the list of NetworkPolicies
                    res.status(200).json(networkPolicies);
                } catch (parseError) {
                    console.error(`Error parsing NetworkPolicy JSON: ${parseError}`);
                    res.status(500).json({ message: 'Failed to parse NetworkPolicies' });
                }
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteNetworkPolicy = (req, res) => {
    const { policyName } = req.body;

    try {

        // Execute kubectl command to delete the NetworkPolicy
            exec(`kubectl delete networkpolicy ${policyName} --namespace=default`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing kubectl: ${error}`);
                    res.status(500).json({ message: 'Failed to delete NetworkPolicy' });
                    return;
                }

                // Check if deletion was successful
                if (stderr) {
                    console.error(`Error deleting NetworkPolicy: ${stderr}`);
                    res.status(500).json({ message: 'Failed to delete NetworkPolicy' });
                    return;
                }

                // Return success message
                res.status(200).json({ message: 'NetworkPolicy deleted successfully' });
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

